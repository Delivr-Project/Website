---
title: "API Overview"
description: "Delivr exposes a first-class REST API. Learn about authentication, API keys, the OpenAPI spec, and the generated type-safe client."
navigation:
  title: API Overview
---

Delivr API is the heart of the project: a Bun + Hono backend that talks to your mail server, serves a first-class OpenAPI spec, and powers the Delivr Web client.

## Base URL and versioning

All API routes are prefixed with `/v1`. A local dev instance is available at `http://localhost:14123/v1`.

```http
GET /v1/health
GET /v1/auth/me
GET /v1/mail-accounts
GET /v1/mail-accounts/{id}/mailboxes
...
```

## OpenAPI reference

Every route is documented with [hono-openapi](https://github.com/honojs/middleware/tree/main/packages/hono-openapi) and browsable through an embedded [Scalar](https://scalar.com) reference. Start the API and visit:

- Interactive docs: `https://api.example.com/docs/v1`
- Raw OpenAPI spec: `https://api.example.com/docs/v1/openapi`

## Authentication

Delivr supports two ways to authenticate:

- **JWT sessions** — users sign in through `POST /v1/auth/login` and receive a session token. The web client stores this in an HTTP-only cookie.
- **API keys** — scoped tokens issued from the web UI and used for programmatic access (e.g. scripts, integrations).

For API-key requests, send the token in the `Authorization: Bearer <token>` header.

## Response envelope

API responses follow a consistent envelope shape:

```json
{
  "success": true,
  "code": 200,
  "message": "OK",
  "data": { ... }
}
```

## Generated client

Delivr Web uses [@hey-api/openapi-ts](https://github.com/hey-api/openapi-ts) to generate a type-safe TypeScript client from the live OpenAPI spec. Keep the client in sync:

```bash
# Start the Delivr API first
bun run api-client:generate
```

The generated files in `app/api-client/` are committed but never edited by hand.

## Mail-server credentials

When a user adds a mail account, Delivr encrypts the IMAP/SMTP credentials with **ECC cryptography** using the `DLA_ENCRYPTION_KEY`. The plaintext credentials are never written to disk.
