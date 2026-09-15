# CLAUDE.md — Claude Code specifics

Read `AGENTS.md` first. This file adds Claude-Code-specific notes.

## Slash commands

Defined in `.claude/settings.json`:

- `/verify` — typecheck + `nuxt generate`.
- `/typecheck` — `bun run typecheck`.
- `/generate` — generate the static site.

## MCP servers

`mcpServers` in `.claude/settings.json` and `.vscode/mcp.json` both register `nuxt` and `nuxt-ui`
for component/styling help.

## Static generation

Run `bun run generate` before deploying. The output is in `.output/public/`.