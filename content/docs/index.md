---
title: "Delivr Documentation"
description: "Documentation for Delivr: a next-generation, open-source email client. Learn what it is, how to self-host it, and how its API works."
navigation:
  title: Overview
---

Delivr is a next-generation, open-source email client for personal and professional team
use. It is self-hostable, standards-based, and designed to work with any email server that
speaks IMAP and SMTP.

## What is Delivr?

Delivr gives you a clean, fast, installable webmail experience while keeping your data under
your control. It is made of two parts:

- **Delivr API** — a Bun + Hono backend that talks to your mail server, handles
  authentication, and exposes a documented REST API.
- **Delivr Web** — a Nuxt 4 Progressive Web App (PWA) that provides the user interface.

::card-group
  :::card{icon="i-lucide-server" title="Delivr API" to="https://github.com/Delivr-Project/Delivr-API" target="_blank"}
  Bun/Hono backend, IMAP/SMTP connectivity, SQLite/PostgreSQL/MySQL support.
  :::
  :::card{icon="i-lucide-layout-template" title="Delivr Web" to="https://github.com/Delivr-Project/Delivr-Web" target="_blank"}
  Nuxt 4 PWA, generated type-safe API client, dark-first installable UI.
  :::
::

## Documentation sections

::card-group
  :::card{icon="i-lucide-info" title="About Delivr" to="/docs/about"}
  Project goals, values, and architecture.
  :::
  :::card{icon="i-lucide-server" title="Self-Hosting" to="/docs/self-hosting"}
  Set up the API and web client on your own server.
  :::
  :::card{icon="i-lucide-settings-2" title="Configuration" to="/docs/configuration"}
  Environment variables for the API and web client.
  :::
  :::card{icon="i-lucide-plug" title="API Overview" to="/docs/api"}
  REST API, authentication, API keys, and OpenAPI docs.
  :::
::
