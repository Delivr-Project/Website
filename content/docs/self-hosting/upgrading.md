---
title: "Updates & Backups"
description: "Update Delivr safely, back up the database and encryption key, and restore an instance from a backup."
navigation:
  title: Updates & Backups
---

# Updates & Backups

Delivr keeps very little state — no mail, just users, settings, and encrypted credentials — so backups are small and updates are quick.

## Staying informed

Releases are published on GitHub with release notes. To get notified, open the [Delivr API](https://github.com/Delivr-Project/Delivr-API) and [Delivr Web](https://github.com/Delivr-Project/Delivr-Web) repositories and choose **Watch → Custom → Releases**.

Delivr follows [semantic versioning](https://semver.org):

| Version change | What to expect |
| --- | --- |
| Patch — `1.0.0` → `1.0.1` | Bug and security fixes. Always safe to apply. |
| Minor — `1.0.x` → `1.1.0` | New features, backwards compatible. May include database migrations. |
| Major — `1.x` → `2.0` | Breaking changes. Read the upgrade notes before updating. |

## Updating

::steps{level="3"}

### Read the release notes

Check both repositories' release notes for anything that needs your attention, such as new or renamed environment variables.

### Back up

Take a [backup](#backups) of the database. Database migrations only run forward, so a backup is your way back.

### Pull and restart

::code-group

```bash [Docker]
cd /opt/delivr
sudo docker compose pull
sudo docker compose up -d
sudo docker image prune -f
```

```bash [Manual]
# See the manual installation guide for the full commands
cd /opt/delivr/api && sudo -u delivr git fetch --tags && sudo -u delivr git checkout <tag> && sudo -u delivr bun install
cd /opt/delivr/web && sudo -u delivr git fetch --tags && sudo -u delivr git checkout <tag> && sudo -u delivr bun install && sudo -u delivr bun run build
sudo systemctl restart delivr-api delivr-web
```

::

On start, the API applies any new database migrations automatically.

### Check

```bash
curl https://api.mail.example.com/health
```

Then sign in and open a mailbox. Installed PWAs pick up the new version automatically the next time they're opened.

::

::warning
Always update the API and the web client **together** and run the **same version** of both.
::

## Backups

### What to back up

| What | Where | Why |
| --- | --- | --- |
| **Database** | `data/db.sqlite` (Docker: `./data/`, manual: `/opt/delivr/api/data/`) | Users, sessions, preferences, identities, and encrypted mail-account credentials. |
| **Encryption key** | `DLA_ENCRYPTION_KEY` in your Compose file or `.env` | Needed to decrypt the stored credentials. **Store it separately from the database backup.** |
| **Configuration** | `docker-compose.yml`, `.env`, systemd units, proxy config | Lets you rebuild the server quickly. |

You don't need to back up mail — it stays on your users' mail servers. Logs in `data/logs/` are optional.

::caution
A database backup **plus** the encryption key is enough to decrypt every user's IMAP/SMTP password. Keep them in different places, and encrypt your backups.
::

### Back up the database

SQLite can take a consistent copy while Delivr keeps running. Install the `sqlite3` tool on the host and run:

```bash
sudo apt install -y sqlite3
sudo sqlite3 /opt/delivr/data/db.sqlite ".backup '/var/backups/delivr-$(date +%F).sqlite'"
```

Adjust the path to your data directory. To automate it, add a daily cron job in `/etc/cron.d/delivr-backup`:

```bash [crontab]
30 3 * * * root sqlite3 /opt/delivr/data/db.sqlite ".backup '/var/backups/delivr-$(date +\%F).sqlite'" && find /var/backups -name 'delivr-*.sqlite' -mtime +14 -delete
```

Then copy `/var/backups` to off-site storage with the tool of your choice (restic, borg, rclone, …).

### Restore from a backup

1. Stop the API: `docker compose stop delivr-api` (or `systemctl stop delivr-api`).
2. Replace `data/db.sqlite` with your backup file and make sure the service can read and write it.
3. Make sure `DLA_ENCRYPTION_KEY` is the key that was in use when the backup was taken.
4. Start the API again. If the backup is from an older version, pending migrations run on start.

## Changing the encryption key

There is no automatic key rotation yet. If you change `DLA_ENCRYPTION_KEY`, Delivr can no longer decrypt the stored mail-account credentials, and every user has to re-enter the passwords of their mail accounts. Only change it if you believe the key was compromised.
