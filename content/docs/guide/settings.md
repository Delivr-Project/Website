---
title: "Settings & Privacy"
description: "Configure Delivr: profile, mail preferences, the remote-content policy, password and security settings, mail account management, and API keys."
navigation:
  title: Settings & Privacy
---

# Settings & Privacy

All settings live under **Settings** in the sidebar. They're saved to your account, so they follow you to every device.

## General

Change your **username**, **display name**, and **email address**. For your protection, Delivr asks for your **current password** before saving changes.

Your email address here is the one Delivr uses for password-reset links — it doesn't have to be one of your connected mailboxes.

## Mail preferences

**Settings → Preferences → Mail**

| Preference | Default | What it does |
| --- | --- | --- |
| **Auto-mark as read** | On | Marks an email as read shortly after you open it. Turn it off to mark emails as read yourself. |
| **Nest folders under Inbox** | On | Shows Inbox sub-folders beneath the Inbox instead of at the top level. |
| **Drag-and-drop folders** | Off | Lets you reorganize folders by dragging them in the sidebar. |

## Remote content

**Settings → Preferences → Remote Content**

Emails often load images and other content from the sender's servers. That can reveal **when** you read an email, **where** you are (your IP address), and **which device** you use — that's how tracking pixels work.

Delivr **blocks remote content by default**. When you open an email with remote content, you can:

- **Load it once** for this email only
- **Always allow** it for the sender's address
- **Always allow** it for the sender's whole domain

The Remote Content settings page lists all your decisions. Add, change, or remove rules for addresses and domains there. A rule for a specific address wins over a rule for its domain.

## Security

**Settings → Security**

Change your password here. You'll need your current password. Changing it ends all of your active sessions, so you'll sign in again with the new password on every device.

::tip
Sessions expire after 7 days. Signing out ends the session immediately on the server, not just in your browser.
::

## Mail accounts

**Settings → Manage Mail Accounts**

For each connected account you can:

| Page | What you can do |
| --- | --- |
| **Overview** | Rename the account or remove it from Delivr. Removing it doesn't delete any mail on the server. |
| **Backend Configuration** | Update the IMAP and SMTP servers, ports, encryption, and credentials — for example after changing your password. |
| **Folder Settings** | Choose which folders are used as Sent, Drafts, Trash, Spam, and Archive. |
| **Identities** | Manage sender addresses and signatures — see [Writing Mail](/docs/guide/writing#identities-and-signatures). |

Your mail-account passwords are stored **encrypted** on your Delivr server and are never shown again after you save them.

## API keys

**Settings → API Keys**

API keys let scripts and integrations use the [Delivr API](/docs/api) on your behalf, with the same access as your account.

1. Choose **New API Key**.
2. Give it a **description** that says what it's for, and optionally an **expiry date**.
3. **Copy the key immediately** — it starts with `dla_apikey_` and is shown only once.

Delete keys you no longer use. Expired keys are highlighted in the list.

::warning
An API key can do everything you can do — read, send, and delete mail. Keep keys out of source code and shared documents, and prefer keys with an expiry date.
::
