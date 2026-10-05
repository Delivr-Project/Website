---
title: "Production Hardening"
description: "A security checklist for Delivr instances exposed to the internet: TLS, secrets, firewalls, security headers, rate limiting, and updates."
navigation:
  title: Production Hardening
---

# Production Hardening

Delivr ships with secure defaults — encrypted credentials, hashed tokens, no mail at rest, and sanitized rendering. This checklist covers the parts that depend on **your** environment. For how Delivr itself protects data, see the [Security overview](/security).

## Checklist

- [ ] All traffic is served over **HTTPS** with HSTS
- [ ] Only the reverse proxy is reachable from the internet
- [ ] `DLA_ENCRYPTION_KEY` is long, random, backed up, and not in version control
- [ ] Secret files have `600` permissions
- [ ] Self-service sign-up is disabled
- [ ] The API reference is disabled if you don't need it
- [ ] `DLA_TRUST_PROXY=true` is set, and the login endpoint is also rate-limited at the proxy
- [ ] Security headers are set on the web client
- [ ] Backups are encrypted and stored off-site
- [ ] You're watching for new releases

## Transport security

Serve both domains over HTTPS only and redirect plain HTTP. Add an HSTS header so browsers never fall back to HTTP — see the [header examples](#security-headers) below.

The API connects to mail servers over TLS when the mail account is configured with SSL/TLS enabled. Prefer port `993` (IMAPS) and `465` (SMTPS) or `587` (STARTTLS) and avoid unencrypted ports.

## Network exposure

- Bind Delivr to `127.0.0.1` (the [Docker Compose file](/docs/self-hosting/docker) and the [manual guide](/docs/self-hosting/manual) do this) or keep it on an internal Docker network.
- Allow only SSH and your proxy's ports through the firewall:

```bash
sudo ufw default deny incoming
sudo ufw allow OpenSSH
sudo ufw allow 80,443/tcp
sudo ufw enable
```

::note
Docker publishes ports by editing iptables directly, which bypasses `ufw`. That's why the Compose file binds ports to `127.0.0.1` — don't change it to `0.0.0.0`.
::

## Secrets

- Generate the encryption key with `openssl rand -hex 32` — never reuse a password or an example value.
- Keep `.env` and Compose files containing secrets at `chmod 600`, owned by root or the service user.
- Store a copy of the key in a password manager or vault, **not** next to your database backups.
- After setting up the admin account, delete `config/initial_admin_password_reset_token.txt`.

## Accounts and access

- Keep `DELIVR_ENABLE_SIGNUP=false` and create users from **Admin → Users**.
- Give the **Admin** role to as few people as possible.
- Remove accounts of people who leave.
- Encourage users to give **API keys** a description and an expiry date, and to revoke keys they no longer use.

## API reference

The interactive API reference at `/docs/v1` is handy during setup and development but lists every route. If nobody on your instance uses it, turn it off:

```dotenv
DLA_DISABLE_DOCS=true
```

## Rate limiting at the proxy

Delivr limits failed sign-ins in memory — five per client and username, fifteen per username, in any five-minute window. Behind a reverse proxy, every request comes from the proxy's address, so set `DLA_TRUST_PROXY=true` to have Delivr use the client address from `X-Forwarded-For` instead. Only do this when the API port is reachable solely through the proxy (as in the [Docker Compose file](/docs/self-hosting/docker)); otherwise clients could forge the header.

For defense in depth, add a limit at the proxy as well — for example with Nginx:

```nginx
# In the http {} block
limit_req_zone $binary_remote_addr zone=delivr_login:10m rate=10r/m;

# In the API server {} block
location = /v1/auth/login {
    limit_req zone=delivr_login burst=5 nodelay;
    proxy_pass http://127.0.0.1:14123;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Apply the same idea to `/v1/auth/reset-password/request`. Tools like fail2ban can additionally block repeat offenders based on your proxy's access log (`429` and `401` responses on these paths).

## Security headers

Set these on the **web client** domain. They prevent clickjacking, MIME sniffing, and referrer leaks:

::code-group

```caddy [Caddy]
mail.example.com {
	header {
		Strict-Transport-Security "max-age=31536000; includeSubDomains"
		X-Content-Type-Options "nosniff"
		X-Frame-Options "DENY"
		Referrer-Policy "no-referrer"
		Permissions-Policy "camera=(), microphone=(), geolocation=()"
	}
	reverse_proxy 127.0.0.1:14128
}
```

```nginx [Nginx]
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "no-referrer" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
```

::

::caution
If you also add a **Content-Security-Policy**, test it thoroughly: the web client registers its service worker with a small inline script, and email content and BIMI logos load images from other origins. A too-strict policy breaks the app or hides images users chose to load.
::

## Updates and monitoring

- Watch both repositories for releases (**Watch → Custom → Releases**) and apply security updates promptly.
- Monitor the health endpoint `https://api.mail.example.com/health` with your uptime tool.
- Keep the API's log level at `info` in production; use `debug` only temporarily, as it's verbose.

## Backups

Follow the [backup guide](/docs/self-hosting/upgrading#backups). Encrypt backups, keep them off-site, and test a restore at least once.

## Reporting vulnerabilities

Found a security issue in Delivr itself? Please report it privately — see [Responsible disclosure](/security#disclosure).
