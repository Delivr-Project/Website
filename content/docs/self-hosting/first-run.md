---
title: "First Run & Admin Setup"
description: "Claim the initial admin account, secure it, create users, and connect the first mailbox to your new Delivr instance."
navigation:
  title: First Run & Admin Setup
---

# First Run & Admin Setup

Your instance is running and reachable over HTTPS. Now let's claim it.

## The initial admin account

When the API starts with an empty database, it creates one administrator:

| Field | Value |
| --- | --- |
| Username | `admin` |
| Email | `admin@delivr.local` (placeholder — change it) |
| Password | none — set it with a one-time link |

Instead of printing a default password, Delivr generates a **one-time password-reset link**. It's written to the API log and to a file in the config directory (readable only by its owner):

::code-group

```bash [Docker]
sudo docker compose logs delivr-api | grep reset-password
sudo cat ./config/initial_admin_password_reset_token.txt
```

```bash [systemd]
sudo journalctl -u delivr-api | grep reset-password
sudo cat /opt/delivr/api/config/initial_admin_password_reset_token.txt
```

::

The link looks like `https://mail.example.com/auth/reset-password?token=…`.

::warning
The link is valid for **7 days** and works once. Treat it like a password: anyone who has it can take over the admin account. Once you've used it, delete the file.
::

::steps{level="3"}

### Set the admin password

Open the link, choose a strong password, and sign in as `admin`.

### Replace the placeholder email address

Go to **Settings → General** and change the email address from `admin@delivr.local` to a real one (you'll confirm with your current password). Password-reset emails for the admin go to this address.

### Delete the setup file

```bash
sudo rm ./config/initial_admin_password_reset_token.txt                 # Docker
sudo rm /opt/delivr/api/config/initial_admin_password_reset_token.txt   # systemd
```

::

::tip
**Link expired before you used it?** On a brand-new instance with no data yet, stop the API, delete the database file (`data/db.sqlite`), and start again. Delivr creates a fresh admin account with a new link.
::

## Create user accounts

Delivr is a multi-user instance. Administrators create accounts for everyone else:

1. Open **Admin → Users** in the sidebar.
2. Create a user with a username, display name, email address, and an initial password (at least 8 characters).
3. Choose the role: **User** for regular accounts, **Admin** for people who manage the instance.
4. Share the credentials securely. Users can change their password under **Settings → Security**.

See [Administration](/docs/guide/administration) for the full set of admin tools.

## Connect the first mailbox

Each user connects their own mail accounts — Delivr doesn't need access to your mail server in advance.

1. After signing in for the first time, Delivr walks you through a short onboarding.
2. Add a mail account with its **IMAP** (incoming) and **SMTP** (outgoing) settings. The [Mail Provider Settings](/docs/configuration/mail-providers) page lists the values for popular providers.
3. Confirm which folders are your **Sent**, **Drafts**, **Trash**, **Spam**, and **Archive** folders. Delivr detects them automatically and asks you to check.

That's it — your inbox loads. The [User Guide](/docs/guide/getting-started) covers everything from there.

## Recommended next steps

- **Enable system email.** Configure the [`DLA_SMTP_*` variables](/docs/configuration#system-email-smtp) so users can reset forgotten passwords themselves.
- **Install the app.** Open Delivr on your phone and desktop and [install it as a PWA](/docs/guide/getting-started#install-delivr-as-an-app).
- **Harden the instance.** Walk through the [Production Hardening](/docs/self-hosting/hardening) checklist.
- **Set up backups.** See [Updates & Backups](/docs/self-hosting/upgrading#backups).
