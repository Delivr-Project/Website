---
title: "Mail Provider Settings"
description: "IMAP and SMTP server settings for connecting popular email providers and self-hosted mail servers to Delivr."
navigation:
  title: Mail Provider Settings
---

# Mail Provider Settings

Delivr works with any mailbox that offers **IMAP** for reading and **SMTP** for sending, with a username and password. Use the table below as a starting point, and check your provider's help pages if something has changed.

## Popular providers

| Provider | IMAP server | SMTP server | Notes |
| --- | --- | --- | --- |
| **Gmail / Google Workspace** | `imap.gmail.com:993` (SSL) | `smtp.gmail.com:465` (SSL) | Requires 2-Step Verification and an **app password**. IMAP must be allowed in Gmail settings. |
| **iCloud Mail** | `imap.mail.me.com:993` (SSL) | `smtp.mail.me.com:587` (STARTTLS) | Requires an **app-specific password**. |
| **Yahoo Mail** | `imap.mail.yahoo.com:993` (SSL) | `smtp.mail.yahoo.com:465` (SSL) | Requires an **app password**. |
| **Fastmail** | `imap.fastmail.com:993` (SSL) | `smtp.fastmail.com:465` (SSL) | Requires an **app password**. |
| **mailbox.org** | `imap.mailbox.org:993` (SSL) | `smtp.mailbox.org:465` (SSL) | |
| **Posteo** | `posteo.de:993` (SSL) | `posteo.de:587` (STARTTLS) | |
| **GMX** | `imap.gmx.net:993` (SSL) | `mail.gmx.net:587` (STARTTLS) | Enable IMAP/POP3 access in the GMX settings first. |
| **WEB.DE** | `imap.web.de:993` (SSL) | `smtp.web.de:587` (STARTTLS) | Enable IMAP/POP3 access in the WEB.DE settings first. |
| **IONOS** | `imap.ionos.de:993` (SSL) | `smtp.ionos.de:465` (SSL) | Use `.com`/`.co.uk` hosts outside Germany. |
| **Zoho Mail** | `imap.zoho.com:993` (SSL) | `smtp.zoho.com:465` (SSL) | Region-specific hosts (e.g. `imap.zoho.eu`) apply to EU accounts. |

In most cases, the username is your **full email address**.

::caution
**Microsoft 365, Outlook.com, and Hotmail** only accept OAuth sign-in for IMAP and SMTP. Password-based access no longer works, so these accounts can't be connected yet. Proton Mail is only reachable over IMAP through the locally installed Proton Mail Bridge.
::

## Self-hosted mail servers

Delivr is a great fit for your own mail server. Typical settings:

| Server software | IMAP | SMTP |
| --- | --- | --- |
| **Mailcow** | `mail.yourdomain.tld:993` (SSL) | `mail.yourdomain.tld:465` (SSL) or `:587` (STARTTLS) |
| **Mail-in-a-Box** | `box.yourdomain.tld:993` (SSL) | `box.yourdomain.tld:465` (SSL) |
| **Stalwart** | `mail.yourdomain.tld:993` (SSL) | `mail.yourdomain.tld:465` (SSL) |
| **Docker Mailserver** | `mail.yourdomain.tld:993` (SSL) | `mail.yourdomain.tld:465` (SSL) or `:587` (STARTTLS) |
| **Dovecot + Postfix** | your host `:993` (SSL) | your host `:587` (STARTTLS) |

::tip
If Delivr runs on the same server or network as your mail server, use the mail server's **public hostname** anyway, so the TLS certificate matches.
::

## Choosing ports and encryption

Delivr supports three encryption modes for each server: **SSL/TLS**, **STARTTLS**, and **None**. With STARTTLS, Delivr refuses to continue if the server can't upgrade the connection, so credentials are never sent unencrypted by accident.

| Protocol | Port | Encryption | Use it? |
| --- | --- | --- | --- |
| IMAP | `993` | SSL/TLS | ✅ Recommended |
| IMAP | `143` | STARTTLS | ✅ Fine |
| SMTP | `465` | SSL/TLS | ✅ Recommended |
| SMTP | `587` | STARTTLS | ✅ Fine |
| Any | any | None | ❌ Avoid — your password travels in plain text |
| SMTP | `25` | — | ❌ Meant for server-to-server traffic and often blocked |

## Special folders

Providers name their folders differently — `Sent`, `Sent Items`, `[Gmail]/Sent Mail`, `Gesendet`, … When you add an account, Delivr detects the **Sent**, **Drafts**, **Trash**, **Spam**, and **Archive** folders automatically (using the IMAP special-use flags) and asks you to confirm them. You can change the mapping later under the account's **Folder Settings**.

## Connection problems?

See [Troubleshooting → A mail account can't connect](/docs/self-hosting/troubleshooting#a-mail-account-cant-connect).
