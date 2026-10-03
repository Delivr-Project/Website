---
title: "Getting Started"
description: "Sign in to Delivr, complete onboarding, connect your first mailbox, and install Delivr as an app on desktop and mobile."
navigation:
  title: Getting Started
---

# Getting Started

Welcome to Delivr! This guide is for **users** of a Delivr instance. If you're setting up your own server, start with [Self-Hosting](/docs/self-hosting).

## Sign in

Open your instance's address — for example `https://mail.example.com` — and sign in with the username and password your administrator gave you.

::tip
Forgot your password? Choose **Forgot password** on the sign-in page. If your instance has system email configured, you'll receive a reset link at your account's email address.
::

After your first sign-in, change your password under **Settings → Security**.

## Onboarding

On your first visit, Delivr asks a few quick questions so the app behaves the way you like:

- **Auto-mark as read** — mark emails as read shortly after you open them.
- **Nest folders under Inbox** — show sub-folders of the Inbox beneath it, or list them at the top level.
- **Drag-and-drop folders** — reorganize your folders by dragging them in the sidebar.

You can skip this and change everything later under **Settings → Preferences**.

## Connect a mailbox

Delivr connects to your existing email account — it doesn't give you a new address.

::steps{level="3"}

### Add the account

Go to **Settings → Manage Mail Accounts** and add a new account.

### Enter the server settings

You'll need the **IMAP** (incoming) and **SMTP** (outgoing) server, port, encryption, username, and password. Most providers use your full email address as the username. The [Mail Provider Settings](/docs/configuration/mail-providers) page lists the values for popular providers.

::note
Accounts with two-factor authentication — like Gmail, iCloud, Yahoo, and Fastmail — need an **app password** instead of your normal password.
::

### Confirm your special folders

Delivr detects your **Sent**, **Drafts**, **Trash**, **Spam**, and **Archive** folders and asks you to confirm them. This tells Delivr where to file sent mail, save drafts, and move deleted messages.

### Check your sender identity

Delivr creates a default sender identity from the account's address. Add more addresses and signatures any time — see [Identities & signatures](/docs/guide/writing#identities-and-signatures).

::

Your inbox opens. Add as many accounts as you like and switch between them from the sidebar.

## Install Delivr as an app

Delivr is a **Progressive Web App**. Installed, it opens in its own window without browser bars, appears in your app launcher, and updates itself automatically.

::tabs

:::tabs-item{label="Chrome & Edge" icon="i-lucide-monitor"}

1. Open your Delivr instance.
2. Click the **install icon** at the right end of the address bar, or open the menu and choose **Install Delivr** (Edge: **Apps → Install this site as an app**).
3. Confirm with **Install**.

:::

:::tabs-item{label="Android" icon="i-lucide-smartphone"}

1. Open your Delivr instance in Chrome.
2. Tap the **⋮** menu.
3. Choose **Install app** or **Add to Home screen**.

:::

:::tabs-item{label="iPhone & iPad" icon="i-lucide-tablet-smartphone"}

1. Open your Delivr instance in **Safari**.
2. Tap the **Share** button.
3. Choose **Add to Home Screen** and confirm with **Add**.

:::

:::tabs-item{label="macOS Safari" icon="i-lucide-laptop"}

1. Open your Delivr instance in Safari.
2. Choose **File → Add to Dock**.

:::

::

::note
Installing requires HTTPS. If you don't see the option, ask your administrator whether the instance is served over HTTPS.
::

## Next steps

- [Reading & Organizing](/docs/guide/reading-and-organizing) — views, folders, search, and shortcuts
- [Writing Mail](/docs/guide/writing) — the composer, attachments, drafts, and signatures
- [Settings & Privacy](/docs/guide/settings) — remote content, security, and API keys
