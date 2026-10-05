---
title: "Manual Installation"
description: "Install Delivr from source with Bun and run the API and the web client as systemd services."
navigation:
  title: Manual Installation
---

# Manual Installation

Prefer not to use containers, or running on ARM64? You can run Delivr directly with [Bun](https://bun.sh) and let systemd keep it running. This guide uses Debian/Ubuntu commands; other distributions work the same way.

::note
[Docker Compose](/docs/self-hosting/docker) is the recommended path for most people — updates are a single command. Choose the manual route if you want full control over the runtime.
::

## Prerequisites

- `git`, `curl`, `openssl`, and `unzip`
- A [reverse proxy](/docs/self-hosting/reverse-proxy) for HTTPS
- Two DNS names — we use `mail.example.com` (web) and `api.mail.example.com` (API)

## 1. Install Bun system-wide

Installing Bun into `/usr/local` makes it available to the service user:

```bash
sudo apt install -y git curl openssl unzip
curl -fsSL https://bun.sh/install | sudo BUN_INSTALL=/usr/local bash
bun --version
```

## 2. Create a service user

```bash
sudo useradd --system --create-home --home-dir /opt/delivr --shell /usr/sbin/nologin delivr
```

## 3. Install the API

::steps{level="3"}

### Clone and install dependencies

```bash
sudo -u delivr git clone https://github.com/Delivr-Project/Delivr-API.git /opt/delivr/api
cd /opt/delivr/api
sudo -u delivr git checkout "$(sudo -u delivr git describe --tags --abbrev=0 2>/dev/null || echo main)"
sudo -u delivr bun install
```

The `checkout` line switches to the latest release tag when there is one.

### Configure

```bash
sudo -u delivr cp example.env .env
sudo -u delivr chmod 600 .env
sudo -u delivr nano .env
```

Set at least these values:

```dotenv [/opt/delivr/api/.env]
DLA_APP_URL=https://mail.example.com
DLA_ENCRYPTION_KEY=<output of: openssl rand -hex 32>

# Only listen on localhost — the reverse proxy is the public entry point
DLA_API_HOST=127.0.0.1
DLA_API_PORT=14123
# Only the local reverse proxy can reach the API, so trust the client address it forwards
DLA_TRUST_PROXY=true

DLA_DB_CONNECTION_URL=./data/db.sqlite
DLA_DB_MIGRATION_DIR=./drizzle/migrations/sqlite
```

See the [Configuration Reference](/docs/configuration#delivr-api) for every option, including [system email](/docs/configuration#system-email-smtp).

::warning
Back up `DLA_ENCRYPTION_KEY` somewhere other than this server. Without it, stored mail-account credentials cannot be decrypted.
::

### Create the systemd service

```ini [/etc/systemd/system/delivr-api.service]
[Unit]
Description=Delivr API
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=delivr
Group=delivr
WorkingDirectory=/opt/delivr/api
ExecStart=/usr/local/bin/bun run start
Restart=on-failure
RestartSec=5

# Hardening
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=full
ProtectHome=true

[Install]
WantedBy=multi-user.target
```

Bun loads `.env` from the working directory automatically. `bun run start` always applies pending database migrations before the server starts.

### Start it

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now delivr-api
curl http://127.0.0.1:14123/health
```

::

## 4. Install the web client

::steps{level="3"}

### Clone, install, and build

```bash
sudo -u delivr git clone https://github.com/Delivr-Project/Delivr-Web.git /opt/delivr/web
cd /opt/delivr/web
sudo -u delivr git checkout "$(sudo -u delivr git describe --tags --abbrev=0 2>/dev/null || echo main)"
sudo -u delivr bun install
sudo -u delivr bun run build
```

The build output lands in `.output/`.

### Create the systemd service

The web client is configured at runtime with `DELIVR_*` variables, so one build works for any domain:

```ini [/etc/systemd/system/delivr-web.service]
[Unit]
Description=Delivr Web
After=network-online.target delivr-api.service
Wants=network-online.target

[Service]
Type=simple
User=delivr
Group=delivr
WorkingDirectory=/opt/delivr/web
Environment=DELIVR_API_URL=https://api.mail.example.com/v1
Environment=DELIVR_APP_URL=https://mail.example.com
Environment=DELIVR_ENABLE_SIGNUP=false
Environment=NITRO_HOST=127.0.0.1
Environment=NITRO_PORT=14128
ExecStart=/usr/local/bin/bun run .output/server/index.mjs
Restart=on-failure
RestartSec=5

NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=full
ProtectHome=true

[Install]
WantedBy=multi-user.target
```

### Start it

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now delivr-web
curl -I http://127.0.0.1:14128
```

::

## 5. Finish up

1. Configure your [reverse proxy](/docs/self-hosting/reverse-proxy) for both domains.
2. Find the one-time admin setup link:

   ```bash
   sudo journalctl -u delivr-api | grep reset-password
   # or
   sudo cat /opt/delivr/api/config/initial_admin_password_reset_token.txt
   ```

3. Continue with [First Run & Admin Setup](/docs/self-hosting/first-run).

## Updating a manual installation

```bash
# API
cd /opt/delivr/api
sudo -u delivr git fetch --tags
sudo -u delivr git checkout <new-version-tag>
sudo -u delivr bun install
sudo systemctl restart delivr-api

# Web
cd /opt/delivr/web
sudo -u delivr git fetch --tags
sudo -u delivr git checkout <new-version-tag>
sudo -u delivr bun install
sudo -u delivr bun run build
sudo systemctl restart delivr-web
```

Back up first — see [Updates & Backups](/docs/self-hosting/upgrading).
