---
title: "Self-Hosting Delivr"
description: "Plan your Delivr deployment: requirements, deployment options, domains, ports, and how the API and the web client fit together."
navigation:
  title: Overview & Requirements
---

# Self-Hosting Delivr

Delivr is built to be self-hosted. A complete instance is just **two small services** — the API and the web client — that sit behind your reverse proxy and connect to the mail servers your users already have.

This page helps you plan a deployment. When you're ready, follow one of the installation guides.

::card-group
  ::card{title="Docker Compose" icon="i-lucide-container" to="/docs/self-hosting/docker"}
  **Recommended.** Run the official container images with one Compose file.
  ::

  ::card{title="Manual installation" icon="i-lucide-terminal" to="/docs/self-hosting/manual"}
  Run with Bun or the standalone binary, managed by systemd.
  ::
::

## What you are deploying

| Component | What it does | Default port | Image |
| --- | --- | --- | --- |
| **Delivr API** | Authenticates users, stores encrypted mail-account credentials, and talks IMAP/SMTP to mail servers. Serves the REST API under `/v1`. | `14123` | `ghcr.io/delivr-project/delivr-api` |
| **Delivr Web** | Serves the web app / PWA that users open in their browser. | `14128` | `ghcr.io/delivr-project/delivr-web` |
| **Reverse proxy** *(yours)* | Terminates HTTPS and forwards traffic to both services. | `443` | Caddy, Nginx, Traefik, … |

Delivr does **not** include a mail server. Each user connects their own mailboxes over IMAP and SMTP — whether that's a hosting provider, a company mail server, or a server you run yourself.

:architecture-diagram

## Requirements

### Server

- A Linux server with **1 vCPU and 2 GB RAM** — plenty for a family or a small team. The container images are built for **x86-64**; on ARM64, use the [manual installation](/docs/self-hosting/manual).
- **Docker Engine 24+** with the Compose plugin, *or* [Bun 1.x](https://bun.sh) for a manual install.
- A few hundred MB of disk. Delivr does not store mail, so the database stays small.

### Network

- **Two DNS names** pointing at your server, for example:
  - `mail.example.com` → the web client
  - `api.mail.example.com` → the API
- Ports **80 and 443** open to the internet for your reverse proxy (and for obtaining TLS certificates).
- **Outbound access** from the API to your users' mail servers — usually IMAP on `993` and SMTP on `465` or `587`.

::tip
Not sure about domains yet? Any two hostnames work — they don't have to be subdomains of each other. `webmail.example.org` and `delivr-api.example.org` are just as fine.
::

### Optional

- An **SMTP account for system mail** (for example `noreply@example.com`) so Delivr can send password-reset emails. See [System email](/docs/configuration#system-email-smtp).

## How the pieces connect

Understanding this saves most of the troubleshooting later:

1. The **browser** loads the web app from `https://mail.example.com`.
2. The web app then calls the API **directly from the browser** at `https://api.mail.example.com/v1`. This is why the API URL you configure for the web client must be a **public** URL, not a Docker-internal hostname.
3. Because the app and the API live on different origins, the API only accepts browser requests from the origin set in `DLA_APP_URL`. It must match the web client's URL **exactly** — scheme, host, and port, with no trailing slash.
4. The **API** connects to each user's IMAP/SMTP server over TLS and streams mail back. Nothing is cached on disk.

::note
The web client's server also calls the API to stream attachment previews, using the same public API URL. Make sure the web container can resolve and reach your public API domain (hairpin NAT), which is normally the case.
::

## Choosing a database

Delivr uses **SQLite** by default. The database only holds users, sessions, encrypted credentials, and preferences — no mail — so SQLite comfortably serves small and medium instances and makes backups as simple as copying a file.

Support for PostgreSQL and MySQL is [on the roadmap](/roadmap).

## Checklist before you start

- [ ] Server with Docker (or Bun) installed
- [ ] DNS records for the web and API domains
- [ ] A reverse proxy that can obtain TLS certificates
- [ ] A securely generated encryption key: `openssl rand -hex 32`
- [ ] *(Optional)* SMTP credentials for system mail

## Next steps

::link-button-group
---
buttons:
  - to: /docs/self-hosting/docker
    icon: i-lucide-container
    label: Install with Docker
    color: primary
  - to: /docs/self-hosting/reverse-proxy
    icon: i-lucide-network
    label: Set up the reverse proxy
    color: neutral
    variant: outline
---
::
