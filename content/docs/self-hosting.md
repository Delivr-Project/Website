---
title: "Self-Hosting Delivr"
description: "Step-by-step guide to self-hosting Delivr: install the API, configure your database, run the web client, and go to production."
navigation:
  title: Self-Hosting Guide
---

# Self-Hosting Delivr

Delivr is designed to be self-hosted in minutes. This guide covers the API backend, the web client, database setup, and a few production notes.

## Prerequisites

- [Bun 1.x](https://bun.sh) installed on the server.
- An email account or server reachable over IMAP (read) and SMTP (send).
- A public domain and reverse proxy if you want HTTPS in production.

## 1. Delivr API

Clone the repository, install dependencies, configure the environment, and run migrations.

```bash
# Clone and install
git clone https://github.com/Delivr-Project/Delivr-API.git
cd Delivr-API
cp example.env .env
bun install

# Run migrations (SQLite by default)
bun run db:sqlite:migrate

# Start the dev server on port 14123
bun run dev
```

### Required environment variables

- `DLA_ENCRYPTION_KEY` — a 32-character key used to encrypt mail-server credentials. Keep it secret and back it up; losing it means losing access to stored mail account credentials.
- `DLA_APP_URL` — the public URL of your Delivr Web client, e.g. `https://app.delivr.email`.

### Database options

SQLite is the default and works out of the box. For heavier deployments you can use PostgreSQL or MySQL:

- SQLite: set `DLA_DB_CONNECTION_URL=./data/db.sqlite`.
- PostgreSQL/MySQL: update `DLA_DB_CONNECTION_URL` and run the matching migration commands.

### API ports and docs

By default the API listens on port **14123**. The interactive [Scalar](https://scalar.com) OpenAPI reference is available at `/docs/v1`, and the raw spec at `/docs/v1/openapi`.

## 2. Delivr Web

The web client is a Nuxt 4 app that talks to the API. Point it at the running API, install dependencies, and start it.

```bash
# Clone and install
git clone https://github.com/Delivr-Project/Delivr-Web.git
cd Delivr-Web
cp example.env .env

# Edit .env:
# DELIVR_API_URL=https://api.example.com/v1
# DELIVR_APP_URL=https://app.example.com

bun install
bun run dev
```

The web client runs on port **14128** by default.

### Regenerating the API client

Delivr Web uses a generated type-safe client from the API's OpenAPI spec. When the API changes, keep the client up to date:

```bash
# Start the Delivr API first
bun run api-client:generate
```

Never hand-edit the generated `*.gen.ts` files.

## 3. Production checklist

- Run the API behind an HTTPS reverse proxy.
- Set `DLA_APP_URL` and `DELIVR_APP_URL` to your public HTTPS URLs.
- Keep `DLA_ENCRYPTION_KEY` safe; it is needed to decrypt stored credentials.
- Back up the database directory and the API's `data/` folder.
- Configure outbound SMTP (`DLA_SMTP_*`) if you want password-reset and other system emails.
- Build the static docs site with `bun run generate` if you also deploy this website.
