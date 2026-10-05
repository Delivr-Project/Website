---
title: "Configuration Reference"
description: "Complete environment variable reference for Delivr API and Delivr Web, including system email, attachment limits, and the container runtime variables."
navigation:
  title: Configuration Reference
---

# Configuration Reference

Delivr is configured entirely through environment variables — there are no config files to edit. This page lists every option for both services.

::note
After changing a variable, restart the affected service: `docker compose up -d` (recreates changed containers) or `systemctl restart delivr-api`.
::

## Delivr API

### Required

::field-group
  ::field{name="DLA_APP_URL" type="string" required}
  Public URL of the web client, e.g. `https://mail.example.com` — without a trailing slash. The API only accepts browser requests from this origin (CORS), and uses it to build links such as password-reset URLs.
  ::

  ::field{name="DLA_ENCRYPTION_KEY" type="string" required}
  Secret used to encrypt stored IMAP/SMTP credentials with AES-256-GCM. **At least 32 characters.** Generate one with `openssl rand -hex 32`, keep it secret, and back it up separately from the database.
  ::

  ::field{name="DLA_DB_MIGRATION_DIR" type="path" required}
  Directory containing the database migrations. Preset in the container image. For manual installs, use `./drizzle/migrations/sqlite`.
  ::
::

### Server

| Variable | Default | Description |
| --- | --- | --- |
| `DLA_API_HOST` | `::` | Address to bind to. Use `127.0.0.1` for a manual install behind a local reverse proxy. |
| `DLA_API_PORT` | `14123` | Port to listen on. |
| `DLA_TRUST_PROXY` | `false` | Set to `true` when the API is only reachable through your reverse proxy. Login rate limiting then tells clients apart by the address in `X-Forwarded-For` instead of treating every request as coming from the proxy. Don't enable it while the API port is publicly reachable — clients could forge the header. |
| `DLA_LOG_LEVEL` | `info` | One of `debug`, `info`, `warn`, `error`, `critical`. |
| `DLA_LOG_DIR` | `./data/logs` | Directory for log files. |
| `DLA_CONFIG_BASE_DIR` | `./config` | Directory for generated setup files, such as the initial admin link. |
| `DLA_DISABLE_DOCS` | `false` | Set to `true` to turn off the interactive API reference at `/docs/v1` and the OpenAPI spec. |

### Database

| Variable | Default | Description |
| --- | --- | --- |
| `DLA_DB_CONNECTION_URL` | `./data/db.sqlite` | Path of the SQLite database file. The directory is created if it doesn't exist. |
| `DLA_DB_AUTO_MIGRATE` | `true` | Apply pending migrations on start. `bun run start` and the container image always apply them, whatever this is set to. |

### Attachments

| Variable | Default | Description |
| --- | --- | --- |
| `DLA_MAX_ATTACHMENT_SIZE_MB` | `25` | Maximum **combined** size of the attachments of one mail, in MB, measured before encoding. |

A request that creates or updates a mail may be at most `DLA_MAX_ATTACHMENT_SIZE_MB + 16` MB in total (41 MB by default), covering the message body, attachments, and multipart framing.

::tip
Encoding makes attachments about **37% larger** when they're sent. Keep this value below your mail provider's message size limit divided by 1.37. Bun's request limit caps it at 112 MB. Remember to [raise your reverse proxy's body limit](/docs/self-hosting/reverse-proxy#what-the-proxy-must-do) to match.
::

### System email (SMTP)

Delivr can send its own emails — currently password-reset links. These settings are for **Delivr's sender address**, not for your users' mailboxes, which each have their own credentials. All are optional; leave them unset to disable system email.

| Variable | Default | Description |
| --- | --- | --- |
| `DLA_SMTP_HOST` | — | SMTP server, e.g. `smtp.example.com`. |
| `DLA_SMTP_PORT` | — | SMTP port, usually `465` (TLS) or `587` (STARTTLS). |
| `DLA_SMTP_SECURE` | `false` | `true` for implicit TLS (port `465`). Use `false` for `587`, which upgrades with STARTTLS. |
| `DLA_SMTP_USERNAME` | — | SMTP username. |
| `DLA_SMTP_PASSWORD` | — | SMTP password. |
| `DLA_SMTP_FROM` | `"Delivr" <noreply@delivr.email>` | Sender of system emails, e.g. `Delivr <noreply@example.com>`. Use an address your SMTP server may send as. |

```dotenv [Example]
DLA_SMTP_HOST=smtp.example.com
DLA_SMTP_PORT=465
DLA_SMTP_SECURE=true
DLA_SMTP_USERNAME=noreply@example.com
DLA_SMTP_PASSWORD=app-password-here
DLA_SMTP_FROM="Delivr <noreply@example.com>"
```

## Delivr Web

The web client reads its settings at **runtime**, so the same build or container image works for any domain.

| Variable | Default | Description |
| --- | --- | --- |
| `DELIVR_API_URL` | `http://localhost:14123/v1` | Public URL of the API, **including `/v1`**. Your users' browsers call this URL directly, so it must be reachable from the internet. |
| `DELIVR_APP_URL` | `http://localhost:14128` | Public URL of the web client itself. |
| `DELIVR_ENABLE_SIGNUP` | `false` | Show a sign-up link on the login page. Keep it `false` and create users as an admin. |
| `NITRO_PORT` / `PORT` | `14128` | Port the web server listens on. |
| `NITRO_HOST` / `HOST` | `::` in the container | Address the web server binds to. |

### Build-time variables

When you build the web client from source, you can bake in defaults through a `.env` file (see `example.env`). The `DELIVR_*` variables above always take precedence at runtime.

| Variable | Default | Description |
| --- | --- | --- |
| `DELIVR_API_URL` | `http://localhost:14123/v1` | Build-time default for `DELIVR_API_URL`. |
| `DELIVR_APP_URL` | `http://localhost:14128` | Build-time default for `DELIVR_APP_URL`. |
| `DELIVR_ENABLE_SIGNUP` | `false` | Build-time default for `DELIVR_ENABLE_SIGNUP`. |
| `USE_DEV_PROXY` | `false` | Development only: route API calls through Nuxt's dev proxy. |

## Ports at a glance

| Port | Service | Expose publicly? |
| --- | --- | --- |
| `14123` | Delivr API | No — only via the reverse proxy |
| `14128` | Delivr Web | No — only via the reverse proxy |
| `443` / `80` | Your reverse proxy | Yes |

## Command reference

### Delivr API

| Command | Description |
| --- | --- |
| `bun run start` | Production entry point. Applies migrations, then starts the server. |
| `bun run dev` | Development server with watch mode. |
| `bun test` | Run the test suite. |
| `bun run typecheck` | Type-check the project. |
| `bun run db:sqlite:migrate` | Apply SQLite migrations manually. |
| `bun run db:sqlite:generate` | Generate a new SQLite migration from schema changes. |
| `bun run compile` | Compile a standalone binary. |

### Delivr Web

| Command | Description |
| --- | --- |
| `bun run build` | Production build into `.output/`. |
| `bun run start` | Serve the production build on port `14128`. |
| `bun run dev` | Development server on port `14128`. |
| `bun test` | Run the test suite. |
| `bun run typecheck` | Run `nuxt typecheck` and `tsc`. |
| `bun run api-client:generate` | Regenerate the API client from a running API's OpenAPI spec. |
