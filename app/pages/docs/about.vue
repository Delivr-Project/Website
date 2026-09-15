<script setup lang="ts">
usePageSeo({
	title: "About — Delivr Docs",
	description:
		"What Delivr is and why it exists. A next-generation, open-source, self-hostable email client built on open standards.",
	canonical: "https://www.delivr.email/docs/about",
});
</script>

<template>
	<DocsPage>
		<h1>About Delivr</h1>
		<p class="lead">
			Delivr is a next-generation email client for personal and professional team use. It connects
			to your existing email server over standard IMAP and SMTP, so your data stays where you want it —
			while the experience feels modern, fast, and native.
		</p>

		<h2>The idea</h2>
		<p>
			Most webmail clients are either closed SaaS products or old, slow interfaces. Delivr bridges the
			gap: a Progressive Web App that feels like a modern mail client, combined with a self-hosted
			backend that never stores your mail on disk.
		</p>

		<h2>What makes Delivr different</h2>
		<ul>
			<li>
				<strong>Open source everything</strong> — licensed under AGPL-3.0. Both the API and the
				web client are public on GitHub.
			</li>
			<li>
				<strong>Works with any mail server</strong> — as long as your provider or self-hosted
				server speaks IMAP and SMTP, Delivr can talk to it.
			</li>
			<li>
				<strong>Privacy-first design</strong> — mail content and attachments are streamed from
				IMAP, parsed in memory, and never cached on the backend filesystem or database.
			</li>
			<li>
				<strong>Type-safe from API to UI</strong> — the backend publishes an OpenAPI spec at
				runtime, and the frontend client is generated from it.
			</li>
			<li>
				<strong>Installable PWA</strong> — add Delivr to your home screen or desktop and get an
				offline-capable, auto-updating app shell.
			</li>
		</ul>

		<h2>Architecture overview</h2>
		<p>Delivr is split into two repositories that work together:</p>
		<ol>
			<li>
				The browser loads <strong>Delivr Web</strong> from your chosen public URL. It handles
				login, the mail UI, and settings.
			</li>
			<li>
				The web app calls <strong>Delivr API</strong> for every mail operation. The API
				authenticates the user, encrypts mail-server credentials, and proxies IMAP/SMTP traffic.
			</li>
			<li>
				The API fetches live mail data from your configured <strong>IMAP/SMTP server</strong>,
				so nothing proprietary sits between you and your email.
			</li>
		</ol>

		<div class="not-prose my-8 rounded-xl border border-slate-800 bg-black p-6">
			<div class="flex flex-col items-center gap-6 sm:flex-row sm:justify-around">
				<div class="w-full max-w-[9rem] rounded-lg border border-slate-700 bg-slate-900/50 p-4 text-center">
					<UIcon name="i-lucide-smartphone" class="mx-auto mb-2 text-2xl text-sky-400" />
					<div class="font-medium">Delivr Web</div>
					<div class="text-xs text-slate-500">Nuxt 4 PWA</div>
				</div>
				<div class="flex flex-col items-center text-slate-600">
					<UIcon name="i-lucide-arrow-right" class="hidden text-xl sm:block" />
					<UIcon name="i-lucide-arrow-down" class="text-xl sm:hidden" />
					<span class="text-xs">HTTPS + JWT</span>
				</div>
				<div class="w-full max-w-[9rem] rounded-lg border border-slate-700 bg-slate-900/50 p-4 text-center">
					<UIcon name="i-lucide-server" class="mx-auto mb-2 text-2xl text-sky-400" />
					<div class="font-medium">Delivr API</div>
					<div class="text-xs text-slate-500">Bun + Hono</div>
				</div>
				<div class="flex flex-col items-center text-slate-600">
					<UIcon name="i-lucide-arrow-right" class="hidden text-xl sm:block" />
					<UIcon name="i-lucide-arrow-down" class="text-xl sm:hidden" />
					<span class="text-xs">IMAP + SMTP</span>
				</div>
				<div class="w-full max-w-[9rem] rounded-lg border border-slate-700 bg-slate-900/50 p-4 text-center">
					<UIcon name="i-lucide-mail" class="mx-auto mb-2 text-2xl text-sky-400" />
					<div class="font-medium">Your Mail Server</div>
					<div class="text-xs text-slate-500">Any provider</div>
				</div>
			</div>
		</div>

		<h2>Project values</h2>
		<ul>
			<li><strong>Respect for standards.</strong> We use plain IMAP, SMTP, JWT, and HTTP.</li>
			<li>
				<strong>Respect for privacy.</strong> Mail is streamed, not archived. Analytics and
				tracking have no place in Delivr.
			</li>
			<li>
				<strong>Respect for operators.</strong> Configuration is simple, documentation is
				complete, and self-hosting is a first-class path.
			</li>
		</ul>
	</DocsPage>
</template>
