# AGENTS.md — operating manual for AI coding agents

You are working in the Delivr Website & Docs static site. Follow the LeiCraftMC Style Guides:
https://github.com/LeiCraftMC/Style-Guides.

## Must read

- [docs/00-overview.md](https://github.com/LeiCraftMC/Style-Guides/blob/main/docs/00-overview.md)
- [docs/06-frontend-nuxt.md](https://github.com/LeiCraftMC/Style-Guides/blob/main/docs/06-frontend-nuxt.md)
- [docs/15-design-system.md](https://github.com/LeiCraftMC/Style-Guides/blob/main/docs/15-design-system.md)

## Non-negotiable

- Nuxt 4 `app/` srcDir.
- Tailwind v4 CSS-first; no `tailwind.config.js`. Dark-only (no toggle).
- `nitro: { preset: "static" }`.
- No `useAPI` / `api-client/` / `auth.global.ts` / `AbstractStore` — this shape has no backend.
- Use the `usePageSeo` composable for per-page SEO (+ JSON-LD), not inlined `useSeoMeta`.
- `@tailwindcss/typography` for prose content; static data in `app/data/`.
- Lucide icons only (`i-lucide-*`).
- Format with Biome before finishing.
- Conventional Commits.