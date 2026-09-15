<script setup lang="ts">
usePageSeo({
	title: "Configuration — Delivr Docs",
	description: "Complete environment variable reference for Delivr API and Delivr Web.",
	canonical: "https://www.delivr.email/docs/configuration",
});

const apiVars = [
	{ name: "DLA_LOG_LEVEL", default: "info", desc: "Log verbosity." },
	{ name: "DLA_APP_URL", default: "—", desc: "Public URL of the Delivr Web client. Required." },
	{ name: "DLA_API_HOST", default: "::", desc: "Bind address." },
	{ name: "DLA_API_PORT", default: "14123", desc: "Listen port for the API." },
	{ name: "DLA_DISABLE_DOCS", default: "false", desc: "Disable the Scalar OpenAPI reference." },
	{
		name: "DLA_ENCRYPTION_KEY",
		default: "—",
		desc: "32-character key for credential encryption. Required.",
	},
	{
		name: "DLA_DB_CONNECTION_URL",
		default: "./data/db.sqlite",
		desc: "Database connection string or path.",
	},
	{ name: "DLA_DB_AUTO_MIGRATE", default: "true", desc: "Run migrations on startup." },
	{ name: "DLA_LOG_DIR", default: "./data/logs", desc: "Log output directory." },
	{ name: "DLA_CONFIG_BASE_DIR", default: "./config", desc: "Config base directory." },
	{ name: "DLA_SMTP_HOST", default: "—", desc: "Outbound SMTP host for system emails." },
	{ name: "DLA_SMTP_PORT", default: "—", desc: "Outbound SMTP port." },
	{ name: "DLA_SMTP_USERNAME", default: "—", desc: "Outbound SMTP username." },
	{ name: "DLA_SMTP_PASSWORD", default: "—", desc: "Outbound SMTP password." },
	{ name: "DLA_SMTP_FROM", default: "—", desc: "From address for system emails." },
	{ name: "DLA_SMTP_SECURE", default: "false", desc: "Use TLS for the SMTP connection." },
];

const webVars = [
	{
		name: "DELIVR_API_URL",
		default: "http://localhost:14123/v1",
		desc: "Base URL of the Delivr API (v1).",
	},
	{
		name: "DELIVR_APP_URL",
		default: "http://localhost:14128",
		desc: "Public URL of the web client.",
	},
	{ name: "DELIVR_ENABLE_SIGNUP", default: "false", desc: "Allow self-service registration." },
	{ name: "USE_DEV_PROXY", default: "false", desc: "Route API calls through a dev proxy." },
];

const commands = {
	api: [
		{ cmd: "bun run dev", desc: "Start dev server with watch mode." },
		{ cmd: "bun run start", desc: "Production entry point." },
		{ cmd: "bun run typecheck", desc: "Run TypeScript type checking." },
		{ cmd: "bun test", desc: "Run the test suite." },
		{ cmd: "bun run db:sqlite:migrate", desc: "Run SQLite migrations." },
		{ cmd: "bun run db:sqlite:generate", desc: "Generate a new SQLite migration." },
	],
	web: [
		{ cmd: "bun run dev", desc: "Start dev server on port 14128." },
		{ cmd: "bun run build", desc: "Production build (Bun preset)." },
		{ cmd: "bun run generate", desc: "Static site generation." },
		{ cmd: "bun run typecheck", desc: "Run nuxt typecheck + tsc." },
		{ cmd: "bun run api-client:generate", desc: "Regenerate API client from OpenAPI spec." },
	],
};
</script>

<template>
	<DocsPage>
		<h1>Configuration Reference</h1>
		<p class="lead">
			Delivr is configured entirely through environment variables. This page lists every option for
			both Delivr API and Delivr Web.
		</p>

		<h2>Delivr API environment variables</h2>
		<div class="not-prose overflow-x-auto">
			<table class="min-w-full text-left text-sm">
				<thead>
					<tr class="border-b border-slate-800">
						<th class="py-2 pr-4 font-semibold">Variable</th>
						<th class="py-2 pr-4 font-semibold">Default</th>
						<th class="py-2 font-semibold">Description</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-800">
					<tr v-for="row in apiVars" :key="row.name">
						<td class="py-2 pr-4"><code>{{ row.name }}</code></td>
						<td class="py-2 pr-4 text-slate-400">{{ row.default }}</td>
						<td class="py-2 text-slate-300">{{ row.desc }}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h2>Delivr Web environment variables</h2>
		<div class="not-prose overflow-x-auto">
			<table class="min-w-full text-left text-sm">
				<thead>
					<tr class="border-b border-slate-800">
						<th class="py-2 pr-4 font-semibold">Variable</th>
						<th class="py-2 pr-4 font-semibold">Default</th>
						<th class="py-2 font-semibold">Description</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-800">
					<tr v-for="row in webVars" :key="row.name">
						<td class="py-2 pr-4"><code>{{ row.name }}</code></td>
						<td class="py-2 pr-4 text-slate-400">{{ row.default }}</td>
						<td class="py-2 text-slate-300">{{ row.desc }}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h2>Useful commands</h2>
		<h3>Delivr API</h3>
		<div class="not-prose overflow-x-auto">
			<table class="min-w-full text-left text-sm">
				<tbody class="divide-y divide-slate-800">
					<tr v-for="row in commands.api" :key="row.cmd">
						<td class="py-2 pr-4"><code>{{ row.cmd }}</code></td>
						<td class="py-2 text-slate-300">{{ row.desc }}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h3>Delivr Web</h3>
		<div class="not-prose overflow-x-auto">
			<table class="min-w-full text-left text-sm">
				<tbody class="divide-y divide-slate-800">
					<tr v-for="row in commands.web" :key="row.cmd">
						<td class="py-2 pr-4"><code>{{ row.cmd }}</code></td>
						<td class="py-2 text-slate-300">{{ row.desc }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPage>
</template>
