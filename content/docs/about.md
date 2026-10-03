---
title: "How Delivr Works"
description: "Delivr's architecture: how the web client, the API, and your mail server work together, what is stored where, and the technology behind it."
navigation:
  title: How Delivr Works
---

# How Delivr Works

Delivr is a mail **client**. It doesn't host mailboxes and doesn't keep copies of your mail — it gives you a modern interface on top of the mail servers you already use.

## Architecture

:architecture-diagram

Delivr consists of two services:

| Component | Role | Technology |
| --- | --- | --- |
| **Delivr Web** | The interface: inbox, composer, settings. An installable Progressive Web App. | Nuxt 4, Vue 3, Nuxt UI, Vite PWA |
| **Delivr API** | Authenticates users, keeps their mail-account credentials encrypted, and speaks IMAP and SMTP to their mail servers. | Bun, Hono, Drizzle ORM, imapflow, Nodemailer |

Your **mail server** — a provider like Fastmail or mailbox.org, or your own server — remains the single source of truth for your mail.

## What happens when you open an email

1. The **web app** asks the API for the message, authenticated with your session token.
2. The **API** verifies the token, decrypts the IMAP credentials for that mail account in memory, and fetches the message from your **mail server** over TLS. Open IMAP connections are reused for a short time to keep things fast.
3. The API parses the message in memory and returns its content and attachment metadata. Nothing is written to disk.
4. The **web app** sanitizes the HTML with DOMPurify and, unless you've allowed it, blocks remote content before displaying the email.
5. Attachments are fetched only when you open or download them — re-read from IMAP and streamed straight through.

Actions like moving, flagging, or deleting are sent to your mail server immediately, so every other mail client you use sees the same state.

## What is stored where

| Data | Where it lives |
| --- | --- |
| Emails, attachments, folders, flags | **Your mail server** only |
| Drafts and sent mail | **Your mail server** — in its Drafts and Sent folders |
| User accounts and roles | Delivr database |
| Session tokens and API keys | Delivr database — as Argon2id hashes only |
| IMAP/SMTP credentials | Delivr database — encrypted with AES-256-GCM |
| Preferences, identities, signatures, folder mapping | Delivr database |
| Remote-content decisions | Delivr database — part of your preferences |

The Delivr database is a single SQLite file, typically a few megabytes in size.

## Design decisions

### Standards, not sync engines

Delivr uses plain IMAP and SMTP rather than a proprietary sync protocol. You can use Delivr side by side with Thunderbird, Apple Mail, or your phone's mail app — and stop using it any time without migrating anything.

### Streaming instead of storing

Many webmail systems build a local copy or search index of your mailbox. Delivr deliberately doesn't. That keeps the server small and stateless with respect to mail, and means a compromised Delivr database never contains anyone's email.

### API first

The web client has no private back door into the server — it uses the same public, versioned REST API that's available to you. The API publishes an OpenAPI spec, and the web client's API layer is generated from it, so the two can't drift apart.

### Brand indicators without tracking

Sender avatars use [BIMI](https://bimigroup.org) brand logos when a domain publishes them. The API only reads the DNS record; the logo itself is loaded by your browser and never fetched or stored by the server.

## Project values

- **Respect for standards.** Plain IMAP, SMTP, HTTP, and OpenAPI.
- **Respect for privacy.** Mail is streamed, not archived. Analytics and tracking have no place in Delivr.
- **Respect for operators.** Configuration is simple, documentation is complete, and self-hosting is a first-class path.

Read more about the ideas behind Delivr on the [Philosophy page](/about).
