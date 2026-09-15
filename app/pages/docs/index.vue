<script setup lang="ts">
usePageSeo({
	title: "Docs — Delivr",
	description:
		"Documentation for Delivr: a next-generation, open-source email client. Learn what it is, how to self-host it, and how its API works.",
	canonical: "https://www.delivr.email/docs",
});
</script>

<template>
	<DocsPage>
		<h1>Delivr Documentation</h1>
		<p class="lead">
			Delivr is a next-generation, open-source email client for personal and professional team
			use. It is self-hostable, standards-based, and designed to work with any email server that
			speaks IMAP and SMTP.
		</p>

		<h2>What is Delivr?</h2>
		<p>
			Delivr gives you a clean, fast, installable webmail experience while keeping your data under
			your control. It is made of two parts:
		</p>
		<ul>
			<li>
				<strong>Delivr API</strong> — a Bun + Hono backend that talks to your mail server, handles
				authentication, and exposes a documented REST API.
			</li>
			<li>
				<strong>Delivr Web</strong> — a Nuxt 4 Progressive Web App (PWA) that provides the user
				interface.
			</li>
		</ul>

		<div class="not-prose my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
			<UCard class="border-slate-800 bg-black">
				<div class="space-y-2 p-4">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10">
						<UIcon name="i-lucide-server" class="text-lg text-sky-400" />
					</div>
					<h3 class="font-semibold">Delivr API</h3>
					<p class="text-sm text-slate-400">
						Bun/Hono backend, IMAP/SMTP connectivity, SQLite/PostgreSQL/MySQL support.
					</p>
					<NuxtLink
						to="https://github.com/Delivr-Project/Delivr-API"
						target="_blank"
						class="inline-flex items-center gap-1 text-sm text-sky-400 hover:underline"
					>
						GitHub
						<UIcon name="i-lucide-external-link" class="text-xs" />
					</NuxtLink>
				</div>
			</UCard>
			<UCard class="border-slate-800 bg-black">
				<div class="space-y-2 p-4">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10">
						<UIcon name="i-lucide-layout-template" class="text-lg text-sky-400" />
					</div>
					<h3 class="font-semibold">Delivr Web</h3>
					<p class="text-sm text-slate-400">
						Nuxt 4 PWA, generated type-safe API client, dark-first installable UI.
					</p>
					<NuxtLink
						to="https://github.com/Delivr-Project/Delivr-Web"
						target="_blank"
						class="inline-flex items-center gap-1 text-sm text-sky-400 hover:underline"
					>
						GitHub
						<UIcon name="i-lucide-external-link" class="text-xs" />
					</NuxtLink>
				</div>
			</UCard>
		</div>

		<h2>Documentation sections</h2>
		<div class="not-prose grid grid-cols-1 gap-4 sm:grid-cols-2">
			<NuxtLink
				v-for="page in [
					{ to: '/docs/about', icon: 'i-lucide-info', title: 'About Delivr', body: 'Project goals, values, and architecture.' },
					{ to: '/docs/self-hosting', icon: 'i-lucide-server', title: 'Self-Hosting', body: 'Set up the API and web client on your own server.' },
					{ to: '/docs/configuration', icon: 'i-lucide-settings-2', title: 'Configuration', body: 'Environment variables for the API and web client.' },
					{ to: '/docs/api', icon: 'i-lucide-plug', title: 'API Overview', body: 'REST API, authentication, API keys, and OpenAPI docs.' },
				]"
				:key="page.to"
				:to="page.to"
				class="group flex items-start gap-4 rounded-lg border border-slate-800 bg-black p-4 transition hover:border-sky-400/50"
			>
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/10">
					<UIcon :name="page.icon" class="text-lg text-sky-400" />
				</div>
				<div>
					<h3 class="font-semibold text-slate-200 group-hover:text-sky-400">{{ page.title }}</h3>
					<p class="text-sm text-slate-400">{{ page.body }}</p>
				</div>
			</NuxtLink>
		</div>
	</DocsPage>
</template>
