---
title: "API Overview"
description: "The Delivr REST API: base URL and versioning, authentication with sessions and API keys, the response envelope, the resource tree, the OpenAPI spec, and the generated client."
navigation:
  title: API Overview
---

# API Overview

Everything the Delivr web client does goes through a public, documented REST API. You can use the same API to script your mail, build integrations, or write your own client.

## Base URL and versioning

All routes are versioned and live under `/v1` on your API domain:

```text
https://api.mail.example.com/v1
```

Locally, that's `http://localhost:14123/v1`. Breaking changes will only ever ship under a new version prefix.

The health check lives outside the versioned API:

```http
GET /health
```

## Interactive reference

Every route is described with OpenAPI and browsable in an interactive [Scalar](https://scalar.com) reference on your own instance — unless the operator turned it off with `DLA_DISABLE_DOCS=true`:

| URL | What it is |
| --- | --- |
| `https://api.mail.example.com/docs/v1` | Interactive reference — try requests in the browser |
| `https://api.mail.example.com/docs/v1/openapi` | Raw OpenAPI document (JSON) |

The reference is the source of truth for request and response schemas. This page gives you the big picture.

## Authentication

Send a token in the `Authorization` header with every request:

```http
Authorization: Bearer <token>
```

There are two kinds of tokens:

| Token | Prefix | How you get it | Lifetime |
| --- | --- | --- | --- |
| **Session token** | `dla_sess_` | `POST /v1/auth/login` with username and password | 7 days, or until logout or a password change |
| **API key** | `dla_apikey_` | Created in **Settings → API Keys** or via `/v1/account/apikeys` | Until it expires (optional) or is deleted |

Both are 256-bit random secrets. The server stores only Argon2id hashes, so a token is shown exactly once — when it's created.

::tip
For scripts and integrations, **use an API key** with a description and an expiry date. Don't automate the login endpoint with your password.
::

### Signing in with a session

```bash
curl -X POST https://api.mail.example.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "anna", "password": "…"}'
```

The response contains the session `token`. Check it with `GET /v1/auth/session` and end it with `POST /v1/auth/logout`.

Failed sign-ins are rate-limited; too many attempts return `429 Too Many Requests` with a `Retry-After` header.

### Using an API key

```bash
curl https://api.mail.example.com/v1/mail-accounts \
  -H "Authorization: Bearer dla_apikey_…"
```

API keys act with the same permissions as the user who created them.

## Response envelope

Every response uses the same JSON envelope:

```json
{
  "success": true,
  "code": 200,
  "message": "OK",
  "data": { }
}
```

Errors keep the shape, with `success: false` and a human-readable `message`. For security, validation errors don't echo details about your input.

| Status | Meaning |
| --- | --- |
| `400` | The request is invalid or exceeds a limit (e.g. attachment size). |
| `401` | Missing, invalid, or expired token. |
| `403` | Authenticated, but not allowed (e.g. admin routes). |
| `404` | The resource doesn't exist or isn't yours. |
| `409` | Conflict, e.g. a username that's taken. |
| `429` | Rate limit hit. |

## Resources

Resources are nested the same way your mail is: accounts contain mailboxes, mailboxes contain mails, mails contain attachments.

```text
/v1
├── /auth                    login · session · logout · reset-password
├── /account                 profile · password · apikeys · preferences
├── /mail-accounts
│   └── /{mailAccountID}
│       ├── /credentials     update IMAP/SMTP connection data
│       ├── /identities      sender addresses and signatures
│       ├── /special-use     Sent / Drafts / Trash / Spam / Archive mapping
│       ├── /search          cross-folder search
│       └── /mailboxes
│           └── /{mailboxPath}
│               ├── /status
│               ├── /mail-bulk-actions   move · copy · delete · flags
│               └── /mails
│                   └── /{mailUID}
│                       ├── /send · /move · /flags
│                       └── /attachments/{attachmentId}
├── /bimi/{domain}           sender brand logo lookup
└── /admin/users             user management (admins only)
```

A few conventions:

- **`mailboxPath`** is the IMAP path of the folder, URL-encoded — e.g. `INBOX`, or `INBOX%2FReceipts` for `INBOX/Receipts`.
- **`mailUID`** is the IMAP UID of the message within its mailbox.
- **Lists** are paginated with `limit` (1–100, default 10), `offset`, and `order` (`newest` or `oldest`).
- **Attachments** are addressed by their index within the message and streamed with `Cache-Control: no-store`.

## Common tasks

### List the latest messages in the Inbox

```bash
curl "https://api.mail.example.com/v1/mail-accounts/1/mailboxes/INBOX/mails?limit=20" \
  -H "Authorization: Bearer $DELIVR_API_KEY"
```

### Search across all folders

```bash
curl "https://api.mail.example.com/v1/mail-accounts/1/search?from=billing@acme.com&hasAttachment=true" \
  -H "Authorization: Bearer $DELIVR_API_KEY"
```

Search supports `text`, `subject`, `from`, `to`, `body`, `since` and `before` (Unix timestamps in milliseconds), and the filters `hasAttachment`, `seen`, `flagged`, `answered`, and `draft`.

### Compose and send

Sending is a two-step process, mirroring how mail clients work with IMAP:

1. **Create the message** in a mailbox (usually Drafts) with `POST …/mailboxes/{mailboxPath}/mails`. Send JSON, or `multipart/form-data` with the message as a JSON `mail` field plus one or more `attachments` files.
2. **Send it** with `POST …/mails/{mailUID}/send`. By default (`moveToSent: true`), Delivr then files it into your Sent folder and reports the outcome as `savedToSent`.

The combined attachment size is limited by the instance's `DLA_MAX_ATTACHMENT_SIZE_MB` (25 MB by default).

### Bulk actions

Move, copy, delete, or flag many messages in one request:

```bash
curl -X POST "https://api.mail.example.com/v1/mail-accounts/1/mailboxes/INBOX/mail-bulk-actions/move" \
  -H "Authorization: Bearer $DELIVR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"uids": [4211, 4212, 4215], "targetMailbox": "Archive"}'
```

Check the interactive reference for each action's exact body.

## Generated TypeScript client

Delivr Web doesn't hand-write API calls — it uses a type-safe client generated from the OpenAPI document with [Hey API](https://heyapi.dev). You can generate one for your own TypeScript project the same way:

```bash
npx @hey-api/openapi-ts \
  -i https://api.mail.example.com/docs/v1/openapi \
  -o src/delivr-client
```

Any other OpenAPI generator works too — for Python, Go, Rust, and more.

## Explore the API

::link-button-group
---
buttons:
  - to: https://github.com/Delivr-Project/Delivr-API
    icon: i-lucide-github
    label: Delivr API on GitHub
    color: primary
    target: _blank
  - to: /docs/development
    icon: i-lucide-code-xml
    label: Development Setup
    color: neutral
    variant: outline
---
::
