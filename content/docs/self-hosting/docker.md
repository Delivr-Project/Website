---
title: "Docker Compose"
description: "Install Delivr with Docker Compose using the official API and web client images from the GitHub Container Registry."
navigation:
  title: Docker Compose
---

# Docker Compose

The fastest way to run Delivr is with the official container images and a single Compose file. This guide takes you from an empty server to a running instance.

::note
This guide assumes you've read the [Overview & Requirements](/docs/self-hosting) and have two DNS names ready — we use `mail.example.com` for the web client and `api.mail.example.com` for the API.
::

## Images

| Image | Port | Volumes |
| --- | --- | --- |
| `ghcr.io/delivr-project/delivr-api` | `14123` | `/opt/delivr/api/data` (database, logs) · `/opt/delivr/api/config` (setup files) |
| `ghcr.io/delivr-project/delivr-web` | `14128` | — (stateless) |

Both images are tagged with the release version (for example `:1.0.0`) and `:latest` for the newest stable release. Both have a built-in health check.

## Installation

::steps{level="3"}

### Create a directory

```bash
sudo mkdir -p /opt/delivr && cd /opt/delivr
```

### Download the Compose file

```bash
sudo curl -o docker-compose.yml https://www.delivr.email/static/docker-compose.yml
```

Or create `docker-compose.yml` yourself:

```yaml [docker-compose.yml]
services:
  delivr-api:
    image: ghcr.io/delivr-project/delivr-api:latest
    container_name: delivr-api
    restart: unless-stopped
    ports:
      - "127.0.0.1:14123:14123"
    environment:
      DLA_APP_URL: "https://mail.example.com"
      DLA_ENCRYPTION_KEY: "" # openssl rand -hex 32
      DLA_TRUST_PROXY: "true" # only reachable via your reverse proxy
      DLA_LOG_LEVEL: "info"
      DLA_DISABLE_DOCS: "false"
      DLA_MAX_ATTACHMENT_SIZE_MB: "25"
      # Optional: outbound system mail (password-reset emails)
      # DLA_SMTP_HOST: "smtp.example.com"
      # DLA_SMTP_PORT: "465"
      # DLA_SMTP_SECURE: "true"
      # DLA_SMTP_USERNAME: "noreply@example.com"
      # DLA_SMTP_PASSWORD: ""
      # DLA_SMTP_FROM: "Delivr <noreply@example.com>"
    volumes:
      - ./data:/opt/delivr/api/data
      - ./config:/opt/delivr/api/config

  delivr-web:
    image: ghcr.io/delivr-project/delivr-web:latest
    container_name: delivr-web
    restart: unless-stopped
    ports:
      - "127.0.0.1:14128:14128"
    environment:
      DELIVR_API_URL: "https://api.mail.example.com/v1"
      DELIVR_APP_URL: "https://mail.example.com"
      DELIVR_ENABLE_SIGNUP: "false"
    depends_on:
      delivr-api:
        condition: service_healthy
```

### Generate an encryption key

```bash
openssl rand -hex 32
```

Paste the output into `DLA_ENCRYPTION_KEY`. It must be **at least 32 characters** long.

::warning
**Back up this key somewhere safe, separately from the server.** It encrypts every stored IMAP/SMTP password. If you lose it, users must re-enter the credentials of all their mail accounts. If it leaks together with a database backup, those credentials are exposed.
::

### Set your domains

Replace the example domains:

- `DLA_APP_URL` and `DELIVR_APP_URL` → the web client's public URL, e.g. `https://mail.example.com`
- `DELIVR_API_URL` → the API's public URL **including `/v1`**, e.g. `https://api.mail.example.com/v1`

Use `https://` URLs without a trailing slash.

### Start Delivr

```bash
sudo docker compose up -d
sudo docker compose ps
```

After a few seconds both containers should report `healthy`. On first start, the API creates its database and runs all migrations automatically.

### Put a reverse proxy in front

Both ports are bound to `127.0.0.1`, so nothing is reachable from outside yet. Configure your reverse proxy to serve both domains over HTTPS — see [Reverse Proxy & HTTPS](/docs/self-hosting/reverse-proxy) for ready-made Caddy, Nginx, Traefik, and Apache configurations.

### Claim the admin account

On first start, Delivr creates an `admin` user and prints a one-time link to set its password:

```bash
sudo docker compose logs delivr-api | grep reset-password
# or
sudo cat ./config/initial_admin_password_reset_token.txt
```

Open the link in your browser, set a password, and sign in. Continue with [First Run & Admin Setup](/docs/self-hosting/first-run).

::

## Running behind a containerized proxy

If your reverse proxy runs in Docker too (for example Traefik or Caddy), you don't need to publish any ports. Put Delivr on the proxy's network instead and remove the `ports:` sections:

```yaml [docker-compose.override.yml]
services:
  delivr-api:
    networks: [proxy]
  delivr-web:
    networks: [proxy]

networks:
  proxy:
    external: true
```

The proxy can then reach the services at `http://delivr-api:14123` and `http://delivr-web:14128`. The **Traefik** tab under [Reverse Proxy → Configurations](/docs/self-hosting/reverse-proxy#configurations) shows a complete setup with labels.

## Using an env file

To keep secrets out of `docker-compose.yml`, move them into a `.env` file next to it and reference them:

::code-group

```bash [.env]
DLA_ENCRYPTION_KEY=3f6c…your-generated-key…9a1d
DLA_SMTP_PASSWORD=super-secret
```

```yaml [docker-compose.yml]
services:
  delivr-api:
    environment:
      DLA_ENCRYPTION_KEY: ${DLA_ENCRYPTION_KEY}
      DLA_SMTP_PASSWORD: ${DLA_SMTP_PASSWORD}
```

::

Restrict the file's permissions with `chmod 600 .env`.

## Pinning a version

`:latest` always points to the newest stable release. For predictable upgrades, pin both images to the same version:

```yaml
image: ghcr.io/delivr-project/delivr-api:1.0.0
# …
image: ghcr.io/delivr-project/delivr-web:1.0.0
```

::tip
Always run the API and the web client at the **same version**. The web client is generated from the API's OpenAPI spec, so mismatched versions can break features.
::

## Useful commands

| Command | What it does |
| --- | --- |
| `docker compose ps` | Show container status and health. |
| `docker compose logs -f delivr-api` | Follow the API logs. |
| `docker compose pull && docker compose up -d` | Update to the latest images. |
| `docker compose restart delivr-api` | Restart the API (e.g. after changing variables). |
| `docker compose down` | Stop and remove the containers. Your data in `./data` is kept. |

## Next steps

- [Reverse Proxy & HTTPS](/docs/self-hosting/reverse-proxy)
- [First Run & Admin Setup](/docs/self-hosting/first-run)
- [Configuration Reference](/docs/configuration)
- [Production Hardening](/docs/self-hosting/hardening)
