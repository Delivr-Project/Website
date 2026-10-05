---
title: "Administration"
description: "Administer a Delivr instance: manage user accounts and roles, reset passwords, and understand what administrators can and cannot see."
navigation:
  title: Administration
---

# Administration

Users with the **Admin** role see an **Admin** section in the sidebar. This page covers the tools you have there.

## Roles

| Role | Can do |
| --- | --- |
| **User** | Use Delivr: connect mail accounts, read and send mail, manage their own settings and API keys. |
| **Admin** | Everything a user can, plus manage all user accounts on the instance. |

## Managing users

**Admin → Users** lists every account on the instance with its role.

### Create a user

1. Choose to create a new user.
2. Enter a **username**, **display name**, **email address**, and an initial **password** (at least 8 characters).
3. Choose the **role**.

Share the credentials through a secure channel and ask the user to change the password after signing in.

### Edit a user

Change a user's username, display name, email address, or role. Role changes take effect immediately, including in sessions that are already signed in.

### Reset a password

Set a new password for a user who is locked out. This signs the user out of all sessions. Alternatively, if [system email](/docs/configuration#system-email-smtp) is configured, users can reset their password themselves from the sign-in page.

### Delete a user

Deleting a user signs them out everywhere, revokes their API keys, and removes their Delivr account together with everything stored for it: connected mail accounts and their encrypted credentials, sender identities and signatures, folder mappings, and preferences. **Their mail is not affected** — it stays on their mail servers.

## What administrators can see

Delivr is designed so that even administrators can't read other people's mail through the app:

- Admins manage **accounts**, not mailboxes. There's no feature to open another user's inbox.
- Mail-account passwords are stored encrypted and are never shown in the interface or returned by the API.
- Delivr stores no copies of emails, so there's nothing to browse in the database either.

::note
Whoever operates the server holds the encryption key and has technical access to the database. If several people administer the server, make sure they're people you trust — as with any self-hosted service.
::

## Sign-ups

By default, only admins can create accounts. Keep it that way for private instances: leave `DELIVR_ENABLE_SIGNUP` set to `false`.

## Good practice

- Keep the number of admins small, and use a separate, non-admin account for your everyday mail if you like.
- Remove accounts of people who leave your organization.
- Review the [Production Hardening](/docs/self-hosting/hardening) checklist from time to time.
