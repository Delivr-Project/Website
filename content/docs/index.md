---
title: "Delivr Documentation"
description: "Documentation for Delivr, the open-source, self-hostable email client: self-hosting guides, configuration, the user guide, and the REST API."
navigation:
  title: Overview
---

# Delivr Documentation

Delivr is a next-generation, open-source email client for personal and professional team use. It's self-hostable, privacy-first, and works with any email server that speaks IMAP and SMTP.

These docs cover everything from deploying your own instance to scripting your mail through the API.

## Start here

::card-group
  ::card{title="Self-host Delivr" icon="i-lucide-rocket" to="/docs/self-hosting"}
  Plan your deployment and get an instance running with Docker in minutes.
  ::

  ::card{title="Use Delivr" icon="i-lucide-inbox" to="/docs/guide/getting-started"}
  Sign in, connect your mailbox, and install Delivr on your devices.
  ::

  ::card{title="Build with the API" icon="i-lucide-plug" to="/docs/api"}
  Authenticate with API keys and automate your mail over REST.
  ::

  ::card{title="Contribute" icon="i-lucide-git-pull-request" to="/docs/contributing"}
  Set up a development environment and open your first pull request.
  ::
::

## What is Delivr?

Delivr gives you a clean, fast, installable mail app while your mail stays on your own mail server. It's made of two parts:

- **Delivr API** — a Bun + Hono backend that talks IMAP and SMTP to your mail servers, handles authentication, and exposes a documented REST API.
- **Delivr Web** — a Nuxt 4 Progressive Web App that provides the interface on desktop and mobile.

::icon-card-grid
---
cards:
  - icon: i-lucide-server
    title: Delivr API
    description: Bun + Hono backend, IMAP/SMTP connectivity, OpenAPI docs, SQLite storage.
    to: https://github.com/Delivr-Project/Delivr-API
    target: _blank
  - icon: i-lucide-layout-template
    title: Delivr Web
    description: Nuxt 4 PWA with a generated type-safe API client and a dark-first, installable UI.
    to: https://github.com/Delivr-Project/Delivr-Web
    target: _blank
---
::

Learn more in [How Delivr Works](/docs/about).

## Popular pages

| Topic | Page |
| --- | --- |
| Run Delivr with Docker | [Docker Compose](/docs/self-hosting/docker) |
| HTTPS with Caddy, Nginx, Traefik, or Apache | [Reverse Proxy & HTTPS](/docs/self-hosting/reverse-proxy) |
| Every environment variable | [Configuration Reference](/docs/configuration) |
| IMAP/SMTP settings for Gmail, iCloud, and more | [Mail Provider Settings](/docs/configuration/mail-providers) |
| Search operators like `from:` and `has:attachment` | [Reading & Organizing](/docs/guide/reading-and-organizing#search) |
| Something isn't working | [Troubleshooting](/docs/self-hosting/troubleshooting) |

## Getting help

- Check the [FAQ](/docs/faq) and [Troubleshooting](/docs/self-hosting/troubleshooting).
- Search or open an issue on [GitHub](https://github.com/Delivr-Project).
- Report security issues privately — see [Responsible disclosure](/security#disclosure).
