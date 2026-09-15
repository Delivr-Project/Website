<script setup lang="ts">
usePageSeo({
	title: "Delivr — A Mail Client that actually Delivers",
	description:
		"Delivr is a next-generation, open-source email client for personal and professional team use. Self-hostable, standards-based, and compatible with any IMAP/SMTP email server.",
	canonical: "https://www.delivr.email",
	ogImage: "https://www.delivr.email/static/logo/logo.png",
});

const features = [
	{
		icon: "i-lucide-mail",
		title: "Full mail workflow",
		description:
			"Browse folders, read threads, compose messages, and manage flags across multiple mail accounts — all in one clean interface.",
	},
	{
		icon: "i-lucide-folders",
		title: "Multi-account, multi-folder",
		description:
			"Switch between accounts and drill into any mailbox folder. Bulk move, copy, delete and flag actions keep you in control.",
	},
	{
		icon: "i-lucide-shield-check",
		title: "Safe content & attachments",
		description:
			"HTML is sanitized with DOMPurify, remote-content is gated by policy, and only inert attachment types are previewed inline.",
	},
	{
		icon: "i-lucide-lock",
		title: "Privacy-first by design",
		description:
			"Mail content is never stored or cached server-side. Attachments are re-fetched from IMAP, parsed in memory, and streamed with Cache-Control: no-store.",
	},
	{
		icon: "i-lucide-key",
		title: "JWT auth + scoped API keys",
		description:
			"Token-based sessions plus scoped API keys for programmatic access. Manage security settings, password resets, and admin tools from the UI.",
	},
	{
		icon: "i-lucide-download-cloud",
		title: "Installable PWA",
		description:
			"Built with Nuxt 4 and @vite-pwa/nuxt, Delivr is an auto-updating, offline-capable web app that feels native on desktop and mobile.",
	},
];

const stats = [
	{ value: "AGPL-3.0", label: "Open Source" },
	{ value: "IMAP/SMTP", label: "Any Server" },
	{ value: "PWA", label: "Installable" },
	{ value: "100%", label: "Self-Hostable" },
];

const repoLinks = [
	{
		to: "https://github.com/Delivr-Project/Delivr-Web",
		icon: "i-lucide-layout-template",
		title: "Delivr Web",
		subtitle: "Nuxt 4 web client & PWA",
	},
	{
		to: "https://github.com/Delivr-Project/Delivr-API",
		icon: "i-lucide-server",
		title: "Delivr API",
		subtitle: "Bun + Hono backend",
	},
];
</script>

<template>
	<div class="space-y-0">
		<!-- Hero -->
		<section
			class="relative flex min-h-[92vh] items-center overflow-hidden bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(14,165,233,0.12),transparent)]"
		>
			<div class="pointer-events-none absolute inset-0 overflow-hidden">
				<div class="absolute h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" style="top: 25%; left: 20%"></div>
				<div class="absolute h-96 w-96 rounded-full bg-sky-400/5 blur-3xl" style="bottom: 25%; right: 20%"></div>
			</div>

			<UContainer class="relative z-10">
				<div class="mx-auto max-w-4xl text-center">
					<UBadge color="primary" variant="soft" size="xl" class="mb-6 inline-flex items-center gap-1">
						<UIcon name="i-lucide-send" />
						Open-Source Self-Hostable Mail Client
					</UBadge>

					<div class="mb-6 flex justify-center">
						<DelivrLogo class="h-16 w-auto" />
					</div>

					<h1 class="mb-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-7xl">
						Email that actually
						<span class="bg-linear-to-tr from-sky-400 to-sky-200 bg-clip-text text-transparent">Delivers</span>
					</h1>

					<p class="mx-auto mb-8 max-w-2xl text-lg leading-[1.6] text-slate-400 sm:text-xl lg:text-2xl">
						A next-generation email client for personal and professional team use. Standards-based,
						privacy-first, and compatible with any email server over IMAP and SMTP.
					</p>

					<div class="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
						<UButton to="/docs" size="xl" color="primary" class="px-8">
							<template #leading>
								<UIcon name="i-lucide-book-open" />
							</template>
							Read the Docs
						</UButton>
						<UButton to="/docs/self-hosting" size="xl" color="neutral" variant="outline" class="px-8">
							<template #leading>
								<UIcon name="i-lucide-server" />
							</template>
							Self-Host
						</UButton>
						<UButton
							to="https://github.com/Delivr-Project"
							target="_blank"
							size="xl"
							color="neutral"
							variant="outline"
							class="px-8"
						>
							<template #leading>
								<UIcon name="i-lucide-github" />
							</template>
							GitHub
						</UButton>
					</div>

					<div class="mx-auto grid w-max max-w-xl grid-cols-2 gap-8 text-center md:max-w-3xl md:grid-cols-4">
						<div v-for="stat in stats" :key="stat.label" class="space-y-1">
							<div class="text-2xl font-bold text-sky-400 md:text-3xl">{{ stat.value }}</div>
							<div class="text-sm text-slate-500">{{ stat.label }}</div>
						</div>
					</div>
				</div>
			</UContainer>

			<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
				<UIcon name="i-lucide-chevron-down" class="text-xl" />
			</div>
		</section>

		<!-- Features -->
		<section id="features" class="bg-slate-950/30 py-24">
			<UContainer>
				<header class="mb-12 text-center">
					<UBadge color="primary" variant="soft" size="xl" class="mb-3">Features</UBadge>
					<h2 class="mb-3 text-3xl font-bold sm:text-4xl lg:text-5xl">Why Delivr?</h2>
					<p class="mx-auto max-w-3xl text-lg text-slate-400">
						Everything you need to manage your email — without the lock-in, tracking, or cloud
						dependencies.
					</p>
				</header>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
					<UCard
						v-for="feature in features"
						:key="feature.title"
						class="border-slate-800 bg-black transition duration-300 hover:-translate-y-1 hover:border-sky-400/50"
					>
						<div class="space-y-3 p-2">
							<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-500/10">
								<UIcon :name="feature.icon" class="text-xl text-sky-400" />
							</div>
							<h3 class="text-lg font-semibold">{{ feature.title }}</h3>
							<p class="leading-relaxed text-slate-400">{{ feature.description }}</p>
						</div>
					</UCard>
				</div>
			</UContainer>
		</section>

		<!-- Architecture -->
		<section class="relative py-24">
			<div class="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-sky-500/5 to-transparent"></div>

			<UContainer class="relative z-10">
				<header class="mb-12 text-center">
					<UBadge color="primary" variant="soft" size="xl" class="mb-3">Architecture</UBadge>
					<h2 class="mb-3 text-3xl font-bold sm:text-4xl lg:text-5xl">Two Repos, One Inbox</h2>
					<p class="mx-auto max-w-3xl text-lg text-slate-400">
						Delivr is split into a fast backend and a modern PWA frontend. Bring your own email server
						over standard IMAP and SMTP.
					</p>
				</header>

				<div class="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
					<UCard
						v-for="link in repoLinks"
						:key="link.title"
						class="border-slate-800 bg-black transition hover:border-sky-400/50"
					>
						<NuxtLink :to="link.to" target="_blank" class="flex items-center gap-4 p-4 text-slate-100 no-underline">
							<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-900">
								<UIcon :name="link.icon" class="text-lg text-sky-400" />
							</div>
							<div class="min-w-0 flex-1">
								<h4 class="font-semibold">{{ link.title }}</h4>
								<p class="truncate text-sm text-slate-400">{{ link.subtitle }}</p>
							</div>
							<UIcon name="i-lucide-external-link" class="text-slate-500" />
						</NuxtLink>
					</UCard>
				</div>
			</UContainer>
		</section>

		<!-- Self-host quick start -->
		<section id="self-host" class="bg-slate-950/30 py-24">
			<UContainer>
				<header class="mb-12 text-center">
					<UBadge color="primary" variant="soft" size="xl" class="mb-3">Get Started</UBadge>
					<h2 class="mb-3 text-3xl font-bold sm:text-4xl lg:text-5xl">Run Your Own Delivr</h2>
					<p class="mx-auto max-w-3xl text-lg text-slate-400">
						Self-hosting is straightforward with Bun. The API runs on port 14123, the web client on
						14128.
					</p>
				</header>

				<div class="mx-auto max-w-3xl space-y-6">
					<UCard class="border-slate-800 bg-black">
						<div class="space-y-4 p-4 sm:p-6">
							<pre class="not-prose overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-300"><code># 1. API
$ git clone https://github.com/Delivr-Project/Delivr-API.git
$ cd Delivr-API
$ cp example.env .env
# Set DLA_ENCRYPTION_KEY to 32 characters
$ bun install
$ bun run db:sqlite:migrate
$ bun run dev

# 2. Web
$ git clone https://github.com/Delivr-Project/Delivr-Web.git
$ cd Delivr-Web
$ cp example.env .env
# Point DELIVR_API_URL at your running API
$ bun install
$ bun run dev</code></pre>
							<div class="flex flex-col justify-center gap-4 sm:flex-row">
								<UButton to="/docs/self-hosting" color="primary" class="px-8">
									<template #leading>
										<UIcon name="i-lucide-book-open" />
									</template>
									Full Self-Hosting Guide
								</UButton>
								<UButton
									to="/docs/configuration"
									color="neutral"
									variant="outline"
									class="px-8"
								>
									Configuration Reference
								</UButton>
							</div>
						</div>
					</UCard>
				</div>
			</UContainer>
		</section>

		<!-- CTA -->
		<section class="relative overflow-hidden py-28">
			<div class="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-sky-500/5 to-transparent"></div>

			<UContainer class="relative z-10">
				<div class="mx-auto max-w-3xl text-center">
					<h2 class="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
						Ready to take your inbox
						<span class="bg-linear-to-tr from-sky-400 to-sky-200 bg-clip-text text-transparent">back</span>?
					</h2>
					<p class="mb-8 text-lg text-slate-400">
						Open source, self-hostable, and built to play nicely with the email server you already
						have.
					</p>
					<div class="flex flex-col justify-center gap-4 sm:flex-row">
						<UButton to="/docs" size="xl" color="primary" class="px-8">
							<template #leading>
								<UIcon name="i-lucide-book-open" />
							</template>
							Read the Docs
						</UButton>
						<UButton
							to="https://github.com/Delivr-Project"
							target="_blank"
							size="xl"
							color="neutral"
							variant="outline"
							class="px-8"
						>
							<template #leading>
								<UIcon name="i-lucide-github" />
							</template>
							View on GitHub
						</UButton>
					</div>
				</div>
			</UContainer>
		</section>
	</div>
</template>
