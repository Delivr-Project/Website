---
title: "Reading & Organizing"
description: "Read and organize mail in Delivr: split and list views, multi-select, keyboard shortcuts, bulk actions, drag and drop, folders, and search operators."
navigation:
  title: Reading & Organizing
---

# Reading & Organizing

## Views

Delivr offers two ways to read a folder. Switch between them in the folder toolbar — Delivr remembers your choice.

| View | Best for |
| --- | --- |
| **Split view** | Desktop. The message list and the open email side by side. |
| **List view** | Smaller screens and triage. A full-width list; opening an email shows it on its own. |

Hover over a message for quick actions — **archive**, **delete**, and **mark as read/unread**. Long folders are paginated, and you can choose how many messages to show per page.

## Reading an email

- **Remote content** such as images is blocked until you allow it. A banner lets you load it once, or always allow it for that **sender** or that sender's **domain**. See [Remote content](/docs/guide/settings#remote-content).
- **Sender avatars** show the sender's verified brand logo if their domain publishes a [BIMI](https://bimigroup.org) record, otherwise their Gravatar or initials.
- **Attachments** can be downloaded, and PDFs and images can be previewed directly in a new tab.
- **Reply**, **Reply all**, and **Forward** from the message toolbar or the right-click menu.

By default, an email is marked as read shortly after you open it. You can turn this off in [Preferences](/docs/guide/settings#mail-preferences).

## Selecting messages

| Action | How |
| --- | --- |
| Select a range | **Shift + click** |
| Add or remove one message | **Ctrl + click** (**⌘ + click** on macOS) |
| Select all on the page | **Ctrl + A** (**⌘ + A**) |
| Clear the selection | **Esc** |

### Keyboard shortcuts

| Key | Action |
| --- | --- |
| **↓** or **J** | Next message |
| **↑** or **K** | Previous message |
| **Shift + ↓ / ↑** | Extend the selection |
| **Space** or **X** | Select / deselect the current message |
| **Enter** | Open the current message |
| **Ctrl / ⌘ + A** | Select all |
| **Esc** | Clear the selection |

## Bulk actions

With one or more messages selected, the toolbar and the **right-click menu** let you:

- Mark as **read** or **unread**
- **Archive** — moves to your Archive folder
- **Move to** another folder
- **Delete** — moves to Trash; deleting from Trash removes messages permanently, after a confirmation

Bulk actions are sent to your mail server in a single request, so even large selections are quick.

## Drag and drop

Drag selected messages onto a folder in the sidebar to move them there.

If **Drag-and-drop folders** is enabled in your preferences, you can also reorganize folders: drop a folder onto another to nest it, or into empty space to move it to the top level.

## Folders

Manage folders from the sidebar or under the account's **Folder Settings**:

- **Create**, **rename**, **move**, and **delete** folders
- Choose whether Inbox sub-folders are **nested** under the Inbox or shown at the top level
- Change which folders are used as **Sent**, **Drafts**, **Trash**, **Spam**, and **Archive**

Every change is made directly on your mail server, so other mail clients see the same folders.

## Search

The search bar searches **all folders** of the current account. Type plain words to search subjects, senders, recipients, and bodies — or narrow it down with operators:

| Operator | Finds |
| --- | --- |
| `from:anna` | Messages from a sender (name or address) |
| `to:team@example.com` | Messages to a recipient |
| `subject:"quarterly report"` | Words in the subject — use quotes for phrases |
| `has:attachment` | Messages with attachments |
| `is:unread` / `is:read` | Unread or read messages |
| `is:flagged` / `is:starred` | Flagged messages |
| `is:replied` / `is:unreplied` | Messages you have or haven't answered |
| `is:draft` | Drafts |
| `after:2026-01-01` | Messages after a date |
| `before:2026-02-01` | Messages before a date |

Combine as many as you like:

```text
from:billing@acme.com has:attachment after:2026-01-01 invoice
```

The search bar suggests operators as you type, offers quick filters such as **Unread**, **With attachments**, and **Last 7 days**, and remembers your recent searches.
