---
title: "Development Setup"
description: "Run Delivr API and Delivr Web locally, run the test suites, regenerate the API client, change the database schema, and work on the docs."
navigation:
  title: Development Setup
---

# Development Setup

This guide gets the full Delivr stack running on your machine so you can work on it. If you just want to *use* Delivr, see [Self-Hosting](/docs/self-hosting) instead.

## Prerequisites

- [Bun](https://bun.sh) 1.x
- Git
- An editor with TypeScript and Vue support — VS Code with the Vue (Volar) extension works well
- *(Optional)* a test mailbox with IMAP/SMTP access

## Repositories

| Repository | What it is | Dev port |
| --- | --- | --- |
| [Delivr-API](https://github.com/Delivr-Project/Delivr-API) | Bun + Hono backend | `14123` |
| [Delivr-Web](https://github.com/Delivr-Project/Delivr-Web) | Nuxt 4 web client & PWA | `14128` |
| [Website](https://github.com/Delivr-Project/Website) | This website and the docs | `14129` |

Clone them side by side:

```bash
mkdir delivr && cd delivr
git clone https://github.com/Delivr-Project/Delivr-API.git
git clone https://github.com/Delivr-Project/Delivr-Web.git
git clone https://github.com/Delivr-Project/Website.git
```

## Run the API

```bash
cd Delivr-API
cp example.env .env
```

Edit `.env` for local development:

```dotenv [Delivr-API/.env]
DLA_APP_URL=http://localhost:14128
DLA_ENCRYPTION_KEY=dev-only-key-at-least-32-characters-long
DLA_LOG_LEVEL=debug
```

Then install, migrate, and start the watcher:

```bash
bun install
bun run db:sqlite:migrate
bun run dev
```

The API runs at `http://localhost:14123`, with the interactive reference at `http://localhost:14123/docs/v1`. On the first start, the log prints a link to set the `admin` password — it points at the web client on port `14128`.

## Run the web client

In a second terminal:

```bash
cd Delivr-Web
cp example.env .env   # DELIVR_API_URL=http://localhost:14123/v1 is the default
bun install
bun run dev
```

Open `http://localhost:14128`, set the admin password with the link from the API log, and sign in.

## Tests and type-checking

Both repositories run the same checks in CI on every push and pull request. Run them before you open a PR:

```bash
bun run typecheck
bun test
```

### API tests

The API's suite is integration-heavy and exercises the real request paths:

- `bunfig.toml` preloads `tests/helpers/preload.ts`, which builds the app **in-process** without binding a port, so tests run fine while your dev server is up.
- Mock IMAP servers listen on port `11143` (shared) and `11144`–`11148` (per-test). Make sure these ports are free.
- Outgoing mail goes to mock SMTP servers and an in-memory transport — no mail ever leaves your machine.

## The generated API client

Delivr Web talks to the API through a type-safe client generated from the API's OpenAPI spec. Whenever API routes or models change:

```bash
# With the API running on :14123
cd Delivr-Web
bun run api-client:generate
```

This rewrites the `*.gen.ts` files in `app/api-client/`. Commit them, but **never edit them by hand**.

## Changing the database

The API uses [Drizzle ORM](https://orm.drizzle.team) with **one schema file per SQL dialect** in `src/db/schema/` (`sqlite.ts`, `postgresql.ts`, `mysql.ts`). When you add a table or column:

1. Make the change in **all three** schema files.
2. Generate the migration: `bun run db:sqlite:generate`.
3. Review the generated SQL in `drizzle/migrations/sqlite/` and commit it.

For **data migrations**, create a custom migration with `bunx drizzle-kit generate --custom --name=<name> --config=drizzle/configs/drizzle.sqlite.config.ts` and write idempotent SQL (guard inserts with `WHERE NOT EXISTS`). Remember that mail-account connection data is encrypted, so migrations can't read addresses or credentials from it.

::tip
**New user preference?** Preferences are schemaless rows in `user_preferences`, validated by a Zod schema in `src/api/utils/preferences.ts`. Adding one needs no migration — add its schema to `UserPreferences.schemas` and its GET/PUT routes under `account/preferences`.
::

## Adding an API route

- Routes live in `src/api/versions/v1/routes/<resource>/`, each with an `index.ts` (router) and a `model.ts` (Zod schemas).
- Document every handler with the `APIRouteSpec` / `APIResponseSpec` helpers so it appears in the OpenAPI spec.
- New OpenAPI tags go into `DOCS_TAGS` **and** into the `tags` list and an `x-tagGroups` group in `versions/v1/index.ts` — otherwise they show up orphaned in the reference.
- Wrap multi-step database writes in a transaction.
- Never cache or persist mail content or attachments. Pool connections, not data.

## Building release artifacts

::code-group

```bash [API binary]
cd Delivr-API
bun run compile linux-x64-baseline --no-version-tag
# → build/bin/delivr-api-linux-x64-baseline
```

```bash [API image]
cd Delivr-API
bun run compile linux-x64-baseline --no-version-tag
docker build -f docker/Dockerfile -t delivr-api:dev .
```

```bash [Web image]
cd Delivr-Web
bun run build
docker build -f docker/Dockerfile -t delivr-web:dev .
```

::

## Working on the docs

This website is a static [Nuxt 4](https://nuxt.com) site with [Nuxt Content](https://content.nuxt.com):

```bash
cd Website
bun install
bun run dev   # http://localhost:14129
```

- Docs pages are Markdown files in `content/docs/`. Add new pages to the sidebar in `app/data/docs.ts`.
- You can use components such as `::note`, `::tip`, `::warning`, `::steps`, `::tabs`, `::code-group`, and `::card-group` in Markdown.
- Format with `bun run format` and check with `bun run check` before committing. `bun run generate` builds the static site.

## Next steps

Read the [Contributing guide](/docs/contributing) for the pull-request workflow and conventions.
