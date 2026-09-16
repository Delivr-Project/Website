---
title: "About Delivr"
description: "What Delivr is and why it exists. A next-generation, open-source, self-hostable email client built on open standards."
navigation:
  title: About Delivr
---

# About Delivr

Delivr is a next-generation email client for personal and professional team use. It connects
to your existing email server over standard IMAP and SMTP, so your data stays where you want it —
while the experience feels modern, fast, and native.

## The idea

Most webmail clients are either closed SaaS products or old, slow interfaces. Delivr bridges the
gap: a Progressive Web App that feels like a modern mail client, combined with a self-hosted
backend that never stores your mail on disk.

## What makes Delivr different

- **Open source everything** — licensed under AGPL-3.0. Both the API and the web client are public on GitHub.
- **Works with any mail server** — as long as your provider or self-hosted server speaks IMAP and SMTP, Delivr can talk to it.
- **Privacy-first design** — mail content and attachments are streamed from IMAP, parsed in memory, and never cached on the backend filesystem or database.
- **Type-safe from API to UI** — the backend publishes an OpenAPI spec at runtime, and the frontend client is generated from it.
- **Installable PWA** — add Delivr to your home screen or desktop and get an offline-capable, auto-updating app shell.

## Architecture overview

Delivr is split into two repositories that work together:

1. The browser loads **Delivr Web** from your chosen public URL. It handles login, the mail UI, and settings.
2. The web app calls **Delivr API** for every mail operation. The API authenticates the user, encrypts mail-server credentials, and proxies IMAP/SMTP traffic.
3. The API fetches live mail data from your configured **IMAP/SMTP server**, so nothing proprietary sits between you and your email.

:architecture-diagram

## Project values

- **Respect for standards.** We use plain IMAP, SMTP, JWT, and HTTP.
- **Respect for privacy.** Mail is streamed, not archived. Analytics and tracking have no place in Delivr.
- **Respect for operators.** Configuration is simple, documentation is complete, and self-hosting is a first-class path.
