---
title: "Configuration Reference"
description: "Complete environment variable reference for Delivr API and Delivr Web."
navigation:
  title: Configuration Reference
---

Delivr is configured entirely through environment variables. This page lists every option for both Delivr API and Delivr Web.

## Delivr API environment variables

| Variable | Default | Description |
| --- | --- | --- |
| `DLA_LOG_LEVEL` | `info` | Log verbosity. |
| `DLA_APP_URL` | — | Public URL of the Delivr Web client. **Required.** |
| `DLA_API_HOST` | `::` | Bind address. |
| `DLA_API_PORT` | `14123` | Listen port for the API. |
| `DLA_DISABLE_DOCS` | `false` | Disable the Scalar OpenAPI reference. |
| `DLA_ENCRYPTION_KEY` | — | 32-character key for credential encryption. **Required.** |
| `DLA_DB_CONNECTION_URL` | `./data/db.sqlite` | Database connection string or path. |
| `DLA_DB_AUTO_MIGRATE` | `true` | Run migrations on startup. |
| `DLA_LOG_DIR` | `./data/logs` | Log output directory. |
| `DLA_CONFIG_BASE_DIR` | `./config` | Config base directory. |
| `DLA_SMTP_HOST` | — | Outbound SMTP host for system emails. |
| `DLA_SMTP_PORT` | — | Outbound SMTP port. |
| `DLA_SMTP_USERNAME` | — | Outbound SMTP username. |
| `DLA_SMTP_PASSWORD` | — | Outbound SMTP password. |
| `DLA_SMTP_FROM` | — | From address for system emails. |
| `DLA_SMTP_SECURE` | `false` | Use TLS for the SMTP connection. |

## Delivr Web environment variables

| Variable | Default | Description |
| --- | --- | --- |
| `DELIVR_API_URL` | `http://localhost:14123/v1` | Base URL of the Delivr API (v1). |
| `DELIVR_APP_URL` | `http://localhost:14128` | Public URL of the web client. |
| `DELIVR_ENABLE_SIGNUP` | `false` | Allow self-service registration. |
| `USE_DEV_PROXY` | `false` | Route API calls through a dev proxy. |

## Useful commands

### Delivr API

| Command | Description |
| --- | --- |
| `bun run dev` | Start dev server with watch mode. |
| `bun run start` | Production entry point. |
| `bun run typecheck` | Run TypeScript type checking. |
| `bun test` | Run the test suite. |
| `bun run db:sqlite:migrate` | Run SQLite migrations. |
| `bun run db:sqlite:generate` | Generate a new SQLite migration. |

### Delivr Web

| Command | Description |
| --- | --- |
| `bun run dev` | Start dev server on port 14128. |
| `bun run build` | Production build (Bun preset). |
| `bun run generate` | Static site generation. |
| `bun run typecheck` | Run nuxt typecheck + tsc. |
| `bun run api-client:generate` | Regenerate API client from OpenAPI spec. |
