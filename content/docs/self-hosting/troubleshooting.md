---
title: "Troubleshooting"
description: "Fixes for the most common Delivr deployment problems: startup errors, CORS and sign-in issues, attachment limits, mail account connections, and password-reset email."
navigation:
  title: Troubleshooting
---

# Troubleshooting

Most problems come down to a handful of settings. Start with the logs, then find your symptom below.

## Reading the logs

::code-group

```bash [Docker]
sudo docker compose logs -f delivr-api
sudo docker compose logs -f delivr-web
```

```bash [systemd]
sudo journalctl -u delivr-api -f
sudo journalctl -u delivr-web -f
```

::

For more detail, set `DLA_LOG_LEVEL=debug` on the API and restart it. Log files are also written to `data/logs/`.

## The API exits right after starting

The API validates its configuration on start and stops with a clear message if something is missing:

| Message | Fix |
| --- | --- |
| `The environment variable DLA_ENCRYPTION_KEY is required but not set.` | Set a key: `openssl rand -hex 32`. |
| `DLA_ENCRYPTION_KEY is not set or is too short.` | The key must be at least 32 characters long. |
| `The environment variable DLA_APP_URL is required but not set.` | Set it to the web client's public URL. |
| `The environment variable DLA_DB_MIGRATION_DIR is required but not set.` | Manual installs only: set it to `./drizzle/migrations/sqlite`. The Docker image sets it for you. |
| `… has to be one of the following: …` | A variable has an invalid value, e.g. `DLA_LOG_LEVEL` must be `debug`, `info`, `warn`, `error`, or `critical`. |

If the container keeps restarting with permission errors, make sure the mounted `data` and `config` directories are writable.

## Sign-in fails or CORS errors

Symptoms: the sign-in page loads, but signing in does nothing or shows a network error. The browser console mentions **CORS** or `Access-Control-Allow-Origin`.

The API only accepts browser requests from the origin in `DLA_APP_URL`. Check that it matches the address in your browser's address bar **exactly**:

| ✅ Correct | ❌ Wrong |
| --- | --- |
| `https://mail.example.com` | `https://mail.example.com/` (trailing slash) |
| | `http://mail.example.com` (wrong scheme) |
| | `https://www.mail.example.com` (different host) |
| | `https://mail.example.com:443` (explicit default port) |

Restart the API after changing it.

## The web client calls `localhost:14123`

Symptoms: in the browser's network tab, API requests go to `http://localhost:14123/v1` instead of your API domain.

The container image is configured at **runtime** with `NUXT_PUBLIC_API_URL`. The `DELIVR_API_URL` variable from the web client's `example.env` is only read when building from source. Set:

```yaml
NUXT_PUBLIC_API_URL: "https://api.mail.example.com/v1"
NUXT_PUBLIC_APP_URL: "https://mail.example.com"
```

…and recreate the container with `docker compose up -d`.

## "413 Request Entity Too Large" when sending

Your reverse proxy rejected a mail with attachments before it reached Delivr. Raise the proxy's body limit to at least `DLA_MAX_ATTACHMENT_SIZE_MB` + 16 MB (41 MB with the defaults). See [Reverse Proxy](/docs/self-hosting/reverse-proxy#what-the-proxy-must-do).

## The mail server rejects large messages

Delivr accepted the attachments, but the mail provider refused the message. Attachments grow by about 37% when encoded for sending, so 25 MB of files become roughly 34 MB. Set `DLA_MAX_ATTACHMENT_SIZE_MB` below your provider's limit divided by 1.37 — for a 25 MB provider limit, use `18`.

## A mail account can't connect

- **Double-check host, port, and encryption.** IMAP is usually `993` with SSL/TLS; SMTP `465` with SSL/TLS or `587` with STARTTLS. See [Mail Provider Settings](/docs/configuration/mail-providers).
- **Use an app password** if the account has two-factor authentication (Gmail, iCloud, Yahoo, Fastmail, …).
- **Check that IMAP is enabled** for the mailbox — some providers turn it off by default.
- **Check outbound connectivity** from the server: `nc -vz imap.example.com 993`. Some hosting providers block outgoing SMTP ports.
- **OAuth-only providers** such as Microsoft 365 / Outlook.com no longer accept passwords for IMAP and aren't supported yet.

## Password-reset emails don't arrive

- System email requires the `DLA_SMTP_*` variables. Without them, Delivr can't send any mail of its own. See [System email](/docs/configuration#system-email-smtp).
- Each address can request a reset link once every 15 minutes.
- Check the API log for SMTP errors, and the recipient's spam folder.
- Make sure the user's email address in Delivr is correct — the admin starts out with the placeholder `admin@delivr.local`.

## "Too many login attempts"

After repeated failed sign-ins, Delivr refuses further attempts for that username for up to five minutes. Wait and try again. The counters are kept in memory, so restarting the API also clears them.

## Attachment previews fail, downloads work

Previews are streamed through the web client's server, which calls the API at its **public** URL. Make sure the server running Delivr Web can resolve and reach `NUXT_PUBLIC_API_URL` — test from inside the container:

```bash
sudo docker compose exec delivr-web curl -sf https://api.mail.example.com/health
```

If that fails, your network doesn't allow hairpin connections. Add the public API hostname to the container's `extra_hosts` or fix the DNS on the host.

## The browser doesn't offer to install the app

PWAs require HTTPS (or `localhost`). On iOS and iPadOS, installation is manual: tap **Share → Add to Home Screen** in Safari. See [Install Delivr as an app](/docs/guide/getting-started#install-delivr-as-an-app).

## Still stuck?

Open an issue on [GitHub](https://github.com/Delivr-Project/Delivr-Web/issues) and include:

- The Delivr version and how you deployed it (Docker, manual)
- Your reverse proxy and its configuration
- The relevant log lines — **remove secrets, tokens, and email addresses first**

For security problems, use [responsible disclosure](/security#disclosure) instead.
