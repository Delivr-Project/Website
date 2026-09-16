---
title: "Delivr Documentation"
description: "Documentation for Delivr: a next-generation, open-source email client. Learn what it is, how to self-host it, and how its API works."
navigation:
  title: Overview
---

# Delivr Documentation

Delivr is a next-generation, open-source email client for personal and professional team
use. It is self-hostable, standards-based, and designed to work with any email server that
speaks IMAP and SMTP.

## What is Delivr?

Delivr gives you a clean, fast, installable webmail experience while keeping your data under
your control. It is made of two parts:

- **Delivr API** — a Bun + Hono backend that talks to your mail server, handles
  authentication, and exposes a documented REST API.
- **Delivr Web** — a Nuxt 4 Progressive Web App (PWA) that provides the user interface.

::icon-card-grid
---
cards:
  - icon: i-lucide-server
    title: Delivr API
    description: Bun/Hono backend, IMAP/SMTP connectivity, SQLite/PostgreSQL/MySQL support.
    to: https://github.com/Delivr-Project/Delivr-API
    target: _blank
  - icon: i-lucide-layout-template
    title: Delivr Web
    description: Nuxt 4 PWA, generated type-safe API client, dark-first installable UI.
    to: https://github.com/Delivr-Project/Delivr-Web
    target: _blank
---
::

## Documentation sections

::icon-card-grid
---
cards:
  - icon: i-lucide-info
    title: About Delivr
    description: Project goals, values, and architecture.
    to: /docs/about
  - icon: i-lucide-server
    title: Self-Hosting
    description: Set up the API and web client on your own server.
    to: /docs/self-hosting
  - icon: i-lucide-settings-2
    title: Configuration
    description: Environment variables for the API and web client.
    to: /docs/configuration
  - icon: i-lucide-plug
    title: API Overview
    description: REST API, authentication, API keys, and OpenAPI docs.
    to: /docs/api
---
::
