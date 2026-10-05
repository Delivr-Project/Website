---
title: "Reverse Proxy & HTTPS"
description: "Serve Delivr over HTTPS with Caddy, Nginx, Traefik, or Apache. Includes body-size limits, timeouts, and a single-domain setup."
navigation:
  title: Reverse Proxy & HTTPS
---

# Reverse Proxy & HTTPS

Delivr's services speak plain HTTP on `localhost`. A reverse proxy in front of them terminates TLS, serves both domains, and is the only thing exposed to the internet.

All examples use:

| Domain | Forwards to |
| --- | --- |
| `mail.example.com` | Delivr Web — `127.0.0.1:14128` |
| `api.mail.example.com` | Delivr API — `127.0.0.1:14123` |

## What the proxy must do

- **Serve HTTPS.** Browsers only install PWAs and keep secure cookies on HTTPS origins.
- **Allow large request bodies on the API.** Sending a mail with attachments can be up to `DLA_MAX_ATTACHMENT_SIZE_MB` + 16 MB — **41 MB** with the defaults. Many proxies default to 1 MB.
- **Allow slow responses.** Some IMAP operations (large folders, big attachments, slow mail servers) take longer than typical web requests. A read timeout of 120 seconds is a safe choice.
- **Forward the client address.** Login rate limiting needs to tell clients apart. All examples below pass it on in `X-Forwarded-For` — set `DLA_TRUST_PROXY=true` on the API so Delivr uses it.
- **Not cache API responses.** Delivr sends `Cache-Control: no-store` for attachments; don't override it.

## Configurations

::tabs

:::tabs-item{label="Caddy" icon="i-lucide-shield-check"}

Caddy obtains and renews certificates automatically — this is the shortest working setup.

```caddy [/etc/caddy/Caddyfile]
mail.example.com {
	encode zstd gzip
	reverse_proxy 127.0.0.1:14128
}

api.mail.example.com {
	request_body {
		max_size 50MB
	}
	# Caddy has no proxy timeout by default, so slow IMAP operations are fine.
	reverse_proxy 127.0.0.1:14123
}
```

Reload with `sudo systemctl reload caddy`.

:::

:::tabs-item{label="Nginx" icon="i-lucide-server"}

Obtain a certificate for both names first, for example with Certbot:

```bash
sudo certbot certonly --nginx -d mail.example.com -d api.mail.example.com
```

```nginx [/etc/nginx/sites-available/delivr.conf]
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name mail.example.com api.mail.example.com;
    return 301 https://$host$request_uri;
}

# Web client
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name mail.example.com;

    ssl_certificate     /etc/letsencrypt/live/mail.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mail.example.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:14128;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# API
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name api.mail.example.com;

    ssl_certificate     /etc/letsencrypt/live/mail.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mail.example.com/privkey.pem;

    # Must be larger than DLA_MAX_ATTACHMENT_SIZE_MB + 16 MB
    client_max_body_size 50m;

    location / {
        proxy_pass http://127.0.0.1:14123;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
        proxy_send_timeout 120s;
    }
}
```

Enable it and reload:

```bash
sudo ln -s /etc/nginx/sites-available/delivr.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

:::

:::tabs-item{label="Traefik" icon="i-lucide-route"}

With Traefik running in Docker, configure Delivr through container labels. This assumes Traefik has an entrypoint called `websecure`, a certificate resolver called `letsencrypt`, and a shared external network called `proxy`.

```yaml [docker-compose.yml]
services:
  delivr-api:
    image: ghcr.io/delivr-project/delivr-api:latest
    # … environment and volumes as in the Docker guide, without `ports:` …
    networks: [proxy]
    labels:
      - traefik.enable=true
      - traefik.http.routers.delivr-api.rule=Host(`api.mail.example.com`)
      - traefik.http.routers.delivr-api.entrypoints=websecure
      - traefik.http.routers.delivr-api.tls.certresolver=letsencrypt
      - traefik.http.services.delivr-api.loadbalancer.server.port=14123

  delivr-web:
    image: ghcr.io/delivr-project/delivr-web:latest
    # … environment as in the Docker guide, without `ports:` …
    networks: [proxy]
    labels:
      - traefik.enable=true
      - traefik.http.routers.delivr-web.rule=Host(`mail.example.com`)
      - traefik.http.routers.delivr-web.entrypoints=websecure
      - traefik.http.routers.delivr-web.tls.certresolver=letsencrypt
      - traefik.http.services.delivr-web.loadbalancer.server.port=14128

networks:
  proxy:
    external: true
```

Traefik doesn't limit request bodies by default. If you use a `buffering` middleware, set `maxRequestBodyBytes` to at least `52428800` (50 MB).

:::

:::tabs-item{label="Apache" icon="i-lucide-feather"}

Enable the required modules first:

```bash
sudo a2enmod proxy proxy_http ssl headers
```

```apache [/etc/apache2/sites-available/delivr.conf]
<VirtualHost *:443>
    ServerName mail.example.com

    SSLEngine on
    SSLCertificateFile    /etc/letsencrypt/live/mail.example.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/mail.example.com/privkey.pem

    ProxyPreserveHost On
    RequestHeader set X-Forwarded-Proto "https"
    ProxyPass        / http://127.0.0.1:14128/
    ProxyPassReverse / http://127.0.0.1:14128/
</VirtualHost>

<VirtualHost *:443>
    ServerName api.mail.example.com

    SSLEngine on
    SSLCertificateFile    /etc/letsencrypt/live/mail.example.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/mail.example.com/privkey.pem

    # 50 MB — must be larger than DLA_MAX_ATTACHMENT_SIZE_MB + 16 MB
    LimitRequestBody 52428800
    ProxyTimeout 120

    ProxyPreserveHost On
    RequestHeader set X-Forwarded-Proto "https"
    ProxyPass        / http://127.0.0.1:14123/
    ProxyPassReverse / http://127.0.0.1:14123/
</VirtualHost>
```

```bash
sudo a2ensite delivr && sudo apachectl configtest && sudo systemctl reload apache2
```

:::

::

::tip
If you raise `DLA_MAX_ATTACHMENT_SIZE_MB`, raise the proxy's body limit too. The rule of thumb: **proxy limit ≥ attachment limit + 16 MB**.
::

## Verify the setup

Check that the API answers over HTTPS:

```bash
curl https://api.mail.example.com/health
```

```json
{
  "success": true,
  "code": 200,
  "message": "Delivr API is running",
  "data": null
}
```

Then open `https://mail.example.com`. You should see the Delivr sign-in page. If the page loads but signing in fails, jump to [Troubleshooting](/docs/self-hosting/troubleshooting#sign-in-fails-or-cors-errors) — it's almost always a mismatch between `DLA_APP_URL` and the web client's URL.

## Single domain (advanced)

If you can only use one domain, you can serve the API under a path such as `/api` and strip that prefix in the proxy. The browser then talks to the same origin, so no cross-origin requests are involved.

```caddy [/etc/caddy/Caddyfile]
mail.example.com {
	handle_path /api/* {
		request_body {
			max_size 50MB
		}
		reverse_proxy 127.0.0.1:14123
	}
	handle {
		reverse_proxy 127.0.0.1:14128
	}
}
```

Then configure:

- `DELIVR_API_URL=https://mail.example.com/api/v1`
- `DELIVR_APP_URL=https://mail.example.com`
- `DLA_APP_URL=https://mail.example.com`

::caution
`handle_path` removes the `/api` prefix before forwarding, so the API still receives `/v1/…`. Don't forward the prefix — the API doesn't know about it. The interactive API reference also expects to live at the root of its domain, so with this layout it won't load correctly; set `DLA_DISABLE_DOCS=true` or use a separate API domain if you need it.
::

## Next steps

- [First Run & Admin Setup](/docs/self-hosting/first-run)
- [Production Hardening](/docs/self-hosting/hardening)
