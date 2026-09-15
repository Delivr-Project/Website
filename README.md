# Delivr Website & Docs

The static marketing site and documentation for **Delivr** — a next-generation, open-source,
self-hostable email client that works with any IMAP/SMTP email server.

Published at **https://www.delivr.email**.

## Stack

- Nuxt 4 (`app/` srcDir)
- NuxtUI v4 + Tailwind v4 (CSS-first)
- `nuxt generate` for static output
- Biome formatter/linter
- AGPL-3.0

## Setup

```bash
bun install
bun run dev
```

Dev server runs on port **14129**.

## Generate and deploy

```bash
bun run generate
# deploy .output/public/ via rsync, S3, GitLab Pages, etc.
```

## Structure

See the LeiCraftMC Style Guides:

- [docs/01-project-structure.md](https://github.com/LeiCraftMC/Style-Guides/blob/main/docs/01-project-structure.md)
- [docs/06-frontend-nuxt.md](https://github.com/LeiCraftMC/Style-Guides/blob/main/docs/06-frontend-nuxt.md)
- [docs/15-design-system.md](https://github.com/LeiCraftMC/Style-Guides/blob/main/docs/15-design-system.md)

## License

[AGPL-3.0](./LICENSE)