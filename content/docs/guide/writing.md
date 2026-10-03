---
title: "Writing Mail"
description: "Compose email in Delivr: the rich-text editor, recipients, attachments, priority, automatic drafts, sender identities, and HTML signatures."
navigation:
  title: Writing Mail
---

# Writing Mail

## The composer

Open the composer with **Compose** in the sidebar, or with **Reply**, **Reply all**, or **Forward** on any message.

- **Recipients** — type names or addresses into **To**. Add **Cc** and **Bcc** fields when you need them.
- **From** — choose which of your [identities](#identities-and-signatures) the message is sent from.
- **Rich text** — format with headings, bold, italics, lists, quotes, and links from the editor toolbar.
- **Priority** — mark a message as **high** or **low** priority from the composer's options. Recipients' mail clients show the corresponding flag.

## Attachments

Add files with the attachment button. The composer shows the combined size of all attachments.

Your administrator sets the maximum combined attachment size per message — **25 MB** by default. Keep in mind that your mail provider may have a lower limit of its own.

## Drafts

You never have to save manually. Delivr saves your message to your mail server's **Drafts** folder automatically a moment after you stop typing (and at least every 20 seconds while you keep typing). The composer shows when it last saved.

Because drafts live on your mail server, you can start a message in Delivr and finish it in any other mail client — or the other way around. To continue a draft, open it from the Drafts folder and choose **Edit draft**.

## Sending

When you send, Delivr hands the message to your SMTP server and files a copy in your **Sent** folder. Bcc recipients receive the message without appearing in its headers.

::note
If your Sent folder isn't set up, the message is still sent — Delivr just can't file the copy. Check the account's **Folder Settings**.
::

## Identities and signatures

An **identity** is an address you can send from. Every mail account has at least one, created from the account's own address. Add more — for example an alias like `hello@example.com` that delivers to the same mailbox.

Manage identities in **Settings → Manage Mail Accounts → (account) → Identities**:

| Setting | What it does |
| --- | --- |
| **Display name** | The name recipients see, e.g. *Anna Schmidt* or *Acme Support*. |
| **Email address** | The address the message is sent from. Your mail provider must allow sending from it. |
| **Default identity** | Preselected when you compose a new message from this account. |
| **Signature** | Added below your text on messages sent from this address. Supports formatting and links. |

When you switch the sender in the composer, Delivr swaps the signature for you — unless you've already edited it, in which case your edits are kept.

::tip
Your provider decides which addresses you may send from. If sending from an alias fails, add it as an allowed sender or alias in your provider's settings first.
::
