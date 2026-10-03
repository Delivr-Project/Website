---
title: "Contributing"
description: "How to contribute to Delivr: reporting bugs, requesting features, opening pull requests, commit conventions, code guidelines, and improving the docs."
navigation:
  title: Contributing
---

# Contributing

Thank you for helping make Delivr better! Every contribution matters — a bug report, a typo fix, a feature idea, or a pull request. This guide explains how to make yours count.

## Where things live

| You want to… | Go to |
| --- | --- |
| Report a problem in the interface, or request a UI feature | [Delivr-Web issues](https://github.com/Delivr-Project/Delivr-Web/issues) |
| Report a problem with the server, the API, or mail handling | [Delivr-API issues](https://github.com/Delivr-Project/Delivr-API/issues) |
| Fix or improve the documentation or this website | [Website repository](https://github.com/Delivr-Project/Website) |
| See what's planned | [Roadmap](/roadmap) and the [project boards](https://github.com/orgs/Delivr-Project/projects) |
| Report a security vulnerability | **Privately** — see [Responsible disclosure](/security#disclosure) |

Not sure which repository? Open the issue in Delivr-Web — we'll move it if needed.

## Reporting bugs

Search the existing issues first — maybe it's already known. If not, open a new issue with:

- **What happened** and **what you expected** instead
- **Steps to reproduce**, as precisely as you can
- Your **Delivr version** and how it's deployed (Docker, manual)
- Your **browser and OS**, for interface problems
- Your **mail provider or server software**, for mail problems — some issues only happen with certain IMAP servers
- **Log output or screenshots**, with passwords, tokens, and email addresses removed

## Requesting features

Check the [roadmap](/roadmap) first. If your idea is there, add a 👍 and describe your use case in a comment — knowing *why* people need something helps us design it well.

For new ideas, open an issue that explains the **problem** you want to solve, not only the solution you have in mind. Bigger changes — new dependencies, schema changes, new concepts in the UI — should be discussed in an issue **before** you start coding, so your work fits the project's direction.

## Pull requests

::steps{level="3"}

### Find or open an issue

Comment on the issue to say you're working on it, so nobody duplicates the effort.

### Fork and branch

Create a branch from `main` with a descriptive name:

```bash
git checkout -b feat/search-date-picker
git checkout -b fix/draft-attachment-order
```

### Set up and code

Follow the [Development Setup](/docs/development). Keep each pull request focused on one change — smaller PRs get reviewed faster.

### Check your work

```bash
bun run typecheck
bun test
```

Also, where it applies:

- **API changes** → regenerate the web client with `bun run api-client:generate` and include the result in your Delivr-Web PR.
- **Schema changes** → update all three dialect schema files and commit the generated migration.
- **User-facing changes** → update the docs in the Website repository.

### Commit

Use [Conventional Commits](https://www.conventionalcommits.org):

```text
feat(search): add date picker for after:/before: filters
fix(compose): keep attachment order when saving drafts
docs(self-hosting): add Traefik example
```

| Type | For |
| --- | --- |
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only |
| `refactor` | Code changes that neither fix a bug nor add a feature |
| `test` | Adding or fixing tests |
| `chore` | Tooling, dependencies, CI |

### Open the pull request

Describe **what** changed and **why**, link the issue (`Closes #123`), and add screenshots for visual changes. CI runs type-checking and the tests automatically; a maintainer reviews your PR and may suggest changes.

::

## Code guidelines

- **TypeScript everywhere**, with strict types. Avoid `any` unless there's no reasonable alternative.
- **Validate inputs with Zod** — in the API through route `model.ts` files.
- **Don't edit generated files** (`*.gen.ts`, migrations after they've been released).
- **Privacy is a feature.** Never log, cache, or persist mail content, attachments, or credentials.
- **Web client:** use Nuxt UI components and Lucide icons (`i-lucide-*`), and follow the existing composable and store patterns.
- **Match the surrounding code** — naming, structure, and comment style.

## Improving the docs

Every docs page is a Markdown file in the [Website repository](https://github.com/Delivr-Project/Website) under `content/docs/`. The quickest way to fix something is the **Edit this page on GitHub** link at the bottom of each page.

For larger changes, run the site locally (see [Working on the docs](/docs/development#working-on-the-docs)), and remember to add new pages to `app/data/docs.ts` so they appear in the sidebar.

Good docs are concrete: real commands, real config, and the error message people will actually see.

## Licensing

Delivr is licensed under the [GNU AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html). By submitting a contribution, you agree that it is licensed under the same terms.

## Be kind

Be patient, assume good intent, and keep discussions focused on the work. Everyone here is volunteering their time to build something good. Harassment or disrespect of any kind isn't welcome.
