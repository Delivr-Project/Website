---
title: "FAQ"
description: "Frequently asked questions about Delivr: what it is, which providers work, privacy, pricing, mobile use, teams, and self-hosting."
navigation:
  title: FAQ
---

# Frequently Asked Questions

## General

::accordion

:::accordion-item{label="What is Delivr?" icon="i-lucide-mail"}
Delivr is an open-source email **client** — a modern webmail app you host yourself. It connects to your existing mailboxes over IMAP and SMTP and gives you a fast, installable interface on desktop and mobile.
:::

:::accordion-item{label="Is Delivr an email provider? Do I get a new address?" icon="i-lucide-at-sign"}
No. Delivr doesn't host mailboxes or hand out addresses. You keep your current email provider or mail server, and Delivr connects to it.
:::

:::accordion-item{label="Is Delivr free?" icon="i-lucide-badge-euro"}
Yes. Delivr is free and open-source software under the GNU AGPL-3.0. You can run it for yourself, your family, or your organization at no cost.
:::

:::accordion-item{label="Is there a hosted version I can just sign up for?" icon="i-lucide-cloud"}
Delivr is designed to be self-hosted, so you stay in control of your data. Your hosting provider or IT team may also run an instance for you.
:::

::

## Compatibility

::accordion

:::accordion-item{label="Which email providers work with Delivr?" icon="i-lucide-plug"}
Any provider or server that offers IMAP and SMTP with a username and password — including Gmail and iCloud (with an app password), Fastmail, mailbox.org, Posteo, GMX, and self-hosted servers like Mailcow, Stalwart, or Dovecot/Postfix. See [Mail Provider Settings](/docs/configuration/mail-providers).
:::

:::accordion-item{label="Does Delivr work with Microsoft 365 or Outlook.com?" icon="i-lucide-circle-x"}
Not yet. Microsoft only allows OAuth sign-in for IMAP and SMTP on these services, and Delivr currently connects with passwords. OAuth sign-in for providers is on the [roadmap](/roadmap), starting with Gmail.
:::

:::accordion-item{label="Does Delivr support POP3 or Exchange (EWS)?" icon="i-lucide-server-off"}
No. Delivr uses IMAP, which keeps your mail and folders on the server and in sync across all your devices.
:::

:::accordion-item{label="Can I keep using my other mail apps?" icon="i-lucide-monitor-smartphone"}
Yes. Because Delivr uses standard IMAP, every change — read status, folders, drafts, sent mail — is made on your mail server and shows up in Thunderbird, Apple Mail, or your phone's mail app too.
:::

::

## Privacy & security

::accordion

:::accordion-item{label="Does Delivr store my emails?" icon="i-lucide-database"}
No. Emails and attachments are fetched live from your mail server and are never written to Delivr's disk or database. See [How Delivr Works](/docs/about#what-is-stored-where).
:::

:::accordion-item{label="How are my mail passwords protected?" icon="i-lucide-lock-keyhole"}
They're encrypted with AES-256-GCM using a key the instance operator sets in the server's environment, not in the database. They're never shown again in the interface or returned by the API.
:::

:::accordion-item{label="Does Delivr track me or collect analytics?" icon="i-lucide-eye-off"}
No. There's no analytics, telemetry, or tracking. Delivr even blocks tracking pixels in emails by default.
:::

:::accordion-item{label="Can my administrator read my email?" icon="i-lucide-shield-user"}
Not through Delivr — there's no feature to open another user's mailbox. As with any self-hosted service, whoever operates the server has technical access to it, so use an instance run by someone you trust. See [Administration](/docs/guide/administration#what-administrators-can-see).
:::

:::accordion-item{label="Does Delivr support end-to-end encryption (PGP)?" icon="i-lucide-key-square"}
Not yet. OpenPGP support in the browser, including Mailvelope, is [planned](/roadmap).
:::

::

## Using Delivr

::accordion

:::accordion-item{label="Is there a mobile app?" icon="i-lucide-smartphone"}
Delivr is a Progressive Web App: open your instance on your phone and add it to your home screen. It runs full-screen like a native app and updates itself. See [Install Delivr as an app](/docs/guide/getting-started#install-delivr-as-an-app).
:::

:::accordion-item{label="Does Delivr work offline?" icon="i-lucide-wifi-off"}
The app shell loads offline, but reading and sending mail needs a connection for now. A full offline mode with a local cache and an outbox is on the [roadmap](/roadmap).
:::

:::accordion-item{label="Can I use multiple email accounts?" icon="i-lucide-inbox"}
Yes. Connect as many accounts as you like and switch between them in the sidebar. Each account can have several sender identities with their own signatures.
:::

:::accordion-item{label="Is Delivr available in other languages?" icon="i-lucide-languages"}
Delivr is currently available in English. Translations, starting with German, are on the [roadmap](/roadmap).
:::

::

## Teams & self-hosting

::accordion

:::accordion-item{label="Can my team or company use one instance?" icon="i-lucide-users"}
Yes. One instance serves many users, and admins manage accounts and roles. Shared team inboxes, organizations, and single sign-on with OIDC or SAML are on the [roadmap](/roadmap).
:::

:::accordion-item{label="What do I need to run Delivr?" icon="i-lucide-server"}
A small Linux server with Docker, two domain names, and a reverse proxy for HTTPS. See [Overview & Requirements](/docs/self-hosting).
:::

:::accordion-item{label="How do I update Delivr?" icon="i-lucide-refresh-cw"}
With Docker: `docker compose pull && docker compose up -d`. Database migrations run automatically. See [Updates & Backups](/docs/self-hosting/upgrading).
:::

:::accordion-item{label="Can I offer Delivr to my customers?" icon="i-lucide-briefcase"}
Yes — the AGPL-3.0 allows it. If you modify Delivr, you must make your modified source code available to the users of your instance. See [Open Source](/open-source).
:::

::

Didn't find your answer? Ask on [GitHub](https://github.com/Delivr-Project) or email [support@delivr.email](mailto:support@delivr.email).
