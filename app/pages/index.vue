<script setup lang="ts">
import CtaSection from "~/components/marketing/CtaSection.vue";
import DeviceShowcase from "~/components/marketing/DeviceShowcase.vue";
import IconCard from "~/components/marketing/IconCard.vue";
import SectionHeading from "~/components/marketing/SectionHeading.vue";
import { githubOrgUrl, repositories } from "~/data/project";
import { roadmapHighlights } from "~/data/roadmap";
import { heroScreenshots } from "~/data/showcase";

usePageSeo({
	title: "Delivr — A Mail Client that actually Delivers",
	description:
		"Delivr is a next-generation, open-source email client for personal and professional team use. Self-hostable, privacy-first, and compatible with any IMAP/SMTP email server.",
	canonical: "https://www.delivr.email",
	ogImage: "https://www.delivr.email/static/logo/logo.png",
});

const stats = [
	{ value: "AGPL-3.0", label: "Open Source" },
	{ value: "IMAP/SMTP", label: "Any Server" },
	{ value: "PWA", label: "Desktop & Mobile" },
	{ value: "0", label: "Trackers" },
];

const principles = [
	{
		icon: "i-lucide-code-xml",
		title: "Open by default",
		description: "Every line of the client and the server is public and AGPL-licensed.",
	},
	{
		icon: "i-lucide-eye-off",
		title: "Private by design",
		description: "Your mail stays on your mail server. Delivr streams it, never archives it.",
	},
	{
		icon: "i-lucide-plug-zap",
		title: "Standards first",
		description: "Plain IMAP and SMTP. No proprietary sync, no lock-in, no walled garden.",
	},
	{
		icon: "i-lucide-house",
		title: "Yours to host",
		description: "One Docker Compose file, your server, your domain, your rules.",
	},
];

const features = [
	{
		icon: "i-lucide-inbox",
		title: "One inbox, every account",
		description:
			"Connect any number of IMAP/SMTP accounts and switch between them instantly — work, personal, and that old address you still check.",
	},
	{
		icon: "i-lucide-pen-line",
		title: "A composer that keeps up",
		description:
			"Rich text, attachments, priorities, Cc/Bcc, and drafts that are saved straight to your server's Drafts folder.",
	},
	{
		icon: "i-lucide-at-sign",
		title: "Identities & signatures",
		description:
			"Send as multiple addresses from one account, each with its own HTML signature and a sensible default sender.",
	},
	{
		icon: "i-lucide-search",
		title: "Search with operators",
		description:
			"Find anything across all folders with from:, to:, subject:, has:attachment, is:unread, before: and after: filters.",
	},
	{
		icon: "i-lucide-folder-tree",
		title: "Folders, your way",
		description:
			"Create, nest, and rename folders, drag mail between them, and map Sent, Drafts, Trash and Archive to the folders you actually use.",
	},
	{
		icon: "i-lucide-layers",
		title: "Bulk actions",
		description:
			"Select many messages with Shift, Ctrl or the keyboard, then archive, move, delete or mark them read in one go.",
	},
	{
		icon: "i-lucide-shield-ban",
		title: "Tracking pixels blocked",
		description:
			"Remote images are blocked until you allow them, per sender or per domain. HTML mail is sanitized before it is rendered.",
	},
	{
		icon: "i-lucide-badge-check",
		title: "Verified brand logos",
		description:
			"Senders with a BIMI record show their brand logo, so you can tell the real bank from the phishing attempt at a glance.",
	},
	{
		icon: "i-lucide-smartphone",
		title: "Installable everywhere",
		description:
			"Delivr is a Progressive Web App. Install it on Windows, macOS, Linux, Android or iOS and it updates itself.",
	},
];

const storedItems = [
	"User accounts and roles",
	"Session tokens & API keys — hashed with Argon2id",
	"IMAP/SMTP credentials — encrypted with AES-256-GCM",
	"Preferences, identities, and signatures",
];

const neverStoredItems = [
	"Message bodies and headers",
	"Attachments — streamed with Cache-Control: no-store",
	"Address books harvested from your mail",
	"Analytics, telemetry, or read receipts",
];

const securityHighlights = [
	{
		icon: "i-lucide-lock-keyhole",
		title: "Encrypted credentials",
		description:
			"Mail-server passwords are encrypted at rest with AES-256-GCM and a key only you hold.",
	},
	{
		icon: "i-lucide-fingerprint",
		title: "Hashed tokens",
		description: "Sessions and API keys are random 256-bit secrets, stored only as Argon2id hashes.",
	},
	{
		icon: "i-lucide-file-check-2",
		title: "Safe rendering",
		description:
			"DOMPurify sanitization, a remote-content gate, and an inert-only attachment preview list.",
	},
	{
		icon: "i-lucide-timer-reset",
		title: "Brute-force limits",
		description: "Login attempts are rate-limited per client and per username out of the box.",
	},
];

const faqs = [
	{
		label: "Is Delivr an email provider?",
		content:
			"No. Delivr is an email client. You bring your own mailbox — from a hosting provider or your own mail server — and Delivr connects to it over IMAP and SMTP. Your mail never moves to us.",
	},
	{
		label: "Does Delivr store my emails?",
		content:
			"No. Messages and attachments stay on your mail server and are fetched live when you open them. Delivr's database only holds user accounts, encrypted mail-server credentials, hashed tokens, and your preferences.",
	},
	{
		label: "Which email providers work with Delivr?",
		content:
			"Any provider or server that offers IMAP and SMTP with a username and password: self-hosted servers (Dovecot/Postfix, Mailcow, Stalwart, Mail-in-a-Box …), Fastmail, mailbox.org, Gmail with an app password, and many more. Providers that only allow OAuth sign-in for IMAP, such as Microsoft 365, are not supported yet.",
	},
	{
		label: "Is Delivr free?",
		content:
			"Yes. Delivr is free and open-source software under the GNU AGPL-3.0. You can run it for yourself, your family, or your whole company without paying anyone.",
	},
	{
		label: "Can I use Delivr on my phone?",
		content:
			"Yes. Delivr is a Progressive Web App: open your instance in a mobile browser and choose “Add to Home Screen” or “Install app”. It launches full-screen and updates itself automatically.",
	},
	{
		label: "Can my team use one Delivr instance?",
		content:
			"Yes. One instance serves many users, and administrators manage accounts and roles from the built-in admin area. Shared team inboxes and enterprise single sign-on are on the roadmap.",
	},
	{
		label: "How do I report a security issue?",
		content:
			"Please report vulnerabilities privately through GitHub Security Advisories instead of opening a public issue. See the Security page for details.",
	},
];
</script>

<template>
	<div>
		<!-- Hero -->
		<section
			class="relative overflow-hidden bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(14,165,233,0.14),transparent)] pt-16 pb-20 sm:pt-24"
		>
			<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
				<div class="absolute top-[10%] left-[15%] h-96 w-96 rounded-full bg-sky-500/10 blur-3xl"></div>
				<div class="absolute top-[40%] right-[10%] h-96 w-96 rounded-full bg-sky-400/5 blur-3xl"></div>
			</div>

			<UContainer class="relative z-10">
				<div class="mx-auto max-w-4xl text-center">
					<NuxtLink
						to="/roadmap"
						class="group mb-8 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 py-1 pr-3 pl-1 text-sm text-sky-200 transition hover:border-sky-400/60"
					>
						<span class="rounded-full bg-sky-400 px-2 py-0.5 text-xs font-semibold text-black">1.0</span>
						Delivr 1.0 is here — see what's next
						<UIcon name="i-lucide-arrow-right" class="transition-transform group-hover:translate-x-0.5" />
					</NuxtLink>

					<h1 class="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl md:text-7xl">
						Email that actually
						<span class="bg-linear-to-tr from-sky-400 to-sky-200 bg-clip-text text-transparent">Delivers</span>
					</h1>

					<p class="mx-auto mb-10 max-w-2xl text-lg leading-[1.6] text-pretty text-slate-400 sm:text-xl">
						A fast, modern, open-source mail client for you and your team. Self-host it in minutes,
						connect any IMAP/SMTP mailbox, and keep your mail where it belongs — with you.
					</p>

					<div class="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
						<UButton to="/docs/self-hosting" size="xl" color="primary" icon="i-lucide-rocket" class="justify-center px-8">
							Self-Host Delivr
						</UButton>
						<UButton
							to="/#features"
							size="xl"
							color="neutral"
							variant="outline"
							icon="i-lucide-sparkles"
							class="justify-center px-8"
						>
							Explore Features
						</UButton>
						<UButton
							:to="githubOrgUrl"
							target="_blank"
							size="xl"
							color="neutral"
							variant="outline"
							icon="i-lucide-github"
							class="justify-center px-8"
						>
							GitHub
						</UButton>
					</div>
				</div>

				<DeviceShowcase :desktop="heroScreenshots.desktop" :mobile="heroScreenshots.mobile" />

				<div class="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-8 text-center md:grid-cols-4">
					<div v-for="stat in stats" :key="stat.label" class="space-y-1">
						<div class="text-2xl font-bold text-sky-400 md:text-3xl">{{ stat.value }}</div>
						<div class="text-sm text-slate-500">{{ stat.label }}</div>
					</div>
				</div>
			</UContainer>
		</section>

		<!-- Principles -->
		<section class="border-y border-slate-900 bg-slate-950/40 py-16">
			<UContainer>
				<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					<div v-for="principle in principles" :key="principle.title" class="flex gap-4">
						<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/10">
							<UIcon :name="principle.icon" class="text-lg text-sky-400" />
						</div>
						<div>
							<h3 class="font-semibold">{{ principle.title }}</h3>
							<p class="text-sm leading-relaxed text-slate-400">{{ principle.description }}</p>
						</div>
					</div>
				</div>
				<div class="mt-10 text-center">
					<UButton to="/about" color="primary" variant="link" trailing-icon="i-lucide-arrow-right">
						Read the Delivr philosophy
					</UButton>
				</div>
			</UContainer>
		</section>

		<!-- Features -->
		<section id="features" class="scroll-mt-16 py-24">
			<UContainer>
				<SectionHeading
					badge="Features"
					title="Everything an inbox needs. Nothing it doesn't."
					description="Delivr covers the full mail workflow — without ads, tracking, cloud lock-in, or a data-mining business model."
				/>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
					<IconCard
						v-for="feature in features"
						:key="feature.title"
						:icon="feature.icon"
						:title="feature.title"
						:description="feature.description"
					/>
				</div>
			</UContainer>
		</section>

		<!-- Highlight: privacy -->
		<section class="relative py-24">
			<div
				class="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-sky-500/5 to-transparent"
				aria-hidden="true"
			></div>
			<UContainer class="relative z-10">
				<div class="grid items-center gap-12 lg:grid-cols-2">
					<div>
						<UBadge color="primary" variant="soft" size="xl" class="mb-3">Privacy</UBadge>
						<h2 class="mb-4 text-3xl font-bold text-balance sm:text-4xl">
							Privacy is architecture, not a settings page
						</h2>
						<p class="mb-6 text-lg text-slate-400">
							Delivr was designed so that it simply cannot leak what it never keeps. Mail is read live
							from your IMAP server, parsed in memory, and sent to your browser — then it's gone.
						</p>
						<ul class="space-y-3 text-slate-300">
							<li class="flex gap-3">
								<UIcon name="i-lucide-check" class="mt-1 shrink-0 text-sky-400" />
								No mail cache on disk, no attachment store, no search index to steal.
							</li>
							<li class="flex gap-3">
								<UIcon name="i-lucide-check" class="mt-1 shrink-0 text-sky-400" />
								Remote content is blocked by default, so senders can't see when you read.
							</li>
							<li class="flex gap-3">
								<UIcon name="i-lucide-check" class="mt-1 shrink-0 text-sky-400" />
								No analytics, telemetry, or phone-home — not even an update check.
							</li>
						</ul>
						<UButton to="/security" color="primary" variant="link" trailing-icon="i-lucide-arrow-right" class="mt-6 px-0">
							How Delivr protects your data
						</UButton>
					</div>

					<div class="grid gap-4 sm:grid-cols-2">
						<UCard class="border-slate-800 bg-black">
							<div class="p-2">
								<div class="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-300">
									<UIcon name="i-lucide-database" class="text-sky-400" />
									What Delivr stores
								</div>
								<ul class="space-y-3 text-sm text-slate-400">
									<li v-for="item in storedItems" :key="item" class="flex gap-2">
										<UIcon name="i-lucide-lock" class="mt-0.5 shrink-0 text-sky-400" />
										{{ item }}
									</li>
								</ul>
							</div>
						</UCard>
						<UCard class="border-slate-800 bg-black">
							<div class="p-2">
								<div class="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-300">
									<UIcon name="i-lucide-ban" class="text-rose-400" />
									What it never stores
								</div>
								<ul class="space-y-3 text-sm text-slate-400">
									<li v-for="item in neverStoredItems" :key="item" class="flex gap-2">
										<UIcon name="i-lucide-x" class="mt-0.5 shrink-0 text-rose-400" />
										{{ item }}
									</li>
								</ul>
							</div>
						</UCard>
					</div>
				</div>
			</UContainer>
		</section>

		<!-- Highlight: search + API -->
		<section class="py-24">
			<UContainer>
				<div class="grid gap-6 lg:grid-cols-2">
					<UCard class="border-slate-800 bg-black">
						<div class="space-y-5 p-2 sm:p-4">
							<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-500/10">
								<UIcon name="i-lucide-search" class="text-xl text-sky-400" />
							</div>
							<h3 class="text-2xl font-bold">Search the way you think</h3>
							<p class="text-slate-400">
								Type plain words or combine operators. Delivr searches every folder of the account at
								once and remembers your recent searches.
							</p>
							<div class="flex flex-wrap items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-sm">
								<UIcon name="i-lucide-search" class="text-slate-500" />
								<span class="rounded bg-sky-500/15 px-1.5 py-0.5 text-sky-300">from:billing@acme.com</span>
								<span class="rounded bg-sky-500/15 px-1.5 py-0.5 text-sky-300">has:attachment</span>
								<span class="rounded bg-sky-500/15 px-1.5 py-0.5 text-sky-300">after:2026-01-01</span>
								<span class="text-slate-300">invoice</span>
							</div>
							<p class="text-sm text-slate-500">
								Also: <code class="text-slate-400">to:</code>, <code class="text-slate-400">subject:</code>,
								<code class="text-slate-400">before:</code>, <code class="text-slate-400">is:unread</code>,
								<code class="text-slate-400">is:flagged</code>, <code class="text-slate-400">is:unreplied</code> …
							</p>
						</div>
					</UCard>

					<UCard class="border-slate-800 bg-black">
						<div class="space-y-5 p-2 sm:p-4">
							<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-500/10">
								<UIcon name="i-lucide-terminal" class="text-xl text-sky-400" />
							</div>
							<h3 class="text-2xl font-bold">An API you'll actually want to use</h3>
							<p class="text-slate-400">
								Everything the web app can do, you can script. Every route is documented with OpenAPI and
								browsable in an interactive reference on your own instance.
							</p>
							<pre
								class="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-slate-300"
							><code><span class="text-slate-500">$</span> curl https://api.mail.example.com/v1/mail-accounts \
    -H <span class="text-sky-300">"Authorization: Bearer dla_apikey_…"</span>

{ <span class="text-sky-300">"success"</span>: true, <span class="text-sky-300">"code"</span>: 200, <span class="text-sky-300">"data"</span>: [ … ] }</code></pre>
							<UButton to="/docs/api" color="primary" variant="link" trailing-icon="i-lucide-arrow-right" class="px-0">
								API overview
							</UButton>
						</div>
					</UCard>
				</div>
			</UContainer>
		</section>

		<!-- Security -->
		<section class="bg-slate-950/30 py-24">
			<UContainer>
				<SectionHeading
					badge="Security"
					title="Secure defaults, auditable code"
					description="Security in Delivr isn't a premium tier. It's built into every request — and because it's open source, you don't have to take our word for it."
				/>
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
					<IconCard
						v-for="item in securityHighlights"
						:key="item.title"
						:icon="item.icon"
						:title="item.title"
						:description="item.description"
					/>
				</div>
				<div class="mt-10 text-center">
					<UButton to="/security" color="neutral" variant="outline" size="lg" icon="i-lucide-shield-check">
						Read the security overview
					</UButton>
				</div>
			</UContainer>
		</section>

		<!-- Open source -->
		<section class="relative py-24">
			<UContainer>
				<div class="grid items-start gap-12 lg:grid-cols-5">
					<div class="lg:col-span-2">
						<UBadge color="primary" variant="soft" size="xl" class="mb-3">Open Source</UBadge>
						<h2 class="mb-4 text-3xl font-bold text-balance sm:text-4xl">Built in the open. Owned by everyone.</h2>
						<p class="mb-6 text-lg text-slate-400">
							Delivr is licensed under the GNU AGPL-3.0. The code, the issues, the roadmap, and the
							discussions all happen in public on GitHub — and contributions of every size are welcome.
						</p>
						<div class="flex flex-col gap-3 sm:flex-row">
							<UButton to="/open-source" color="primary" icon="i-lucide-heart-handshake" class="justify-center">
								Get involved
							</UButton>
							<UButton
								to="/docs/contributing"
								color="neutral"
								variant="outline"
								icon="i-lucide-git-pull-request"
								class="justify-center"
							>
								Contributing guide
							</UButton>
						</div>
					</div>

					<div class="grid gap-4 lg:col-span-3">
						<NuxtLink
							v-for="repo in repositories"
							:key="repo.name"
							:to="repo.to"
							target="_blank"
							class="group flex items-center gap-4 rounded-xl border border-slate-800 bg-black p-5 transition hover:border-sky-400/50"
						>
							<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-900">
								<UIcon :name="repo.icon" class="text-lg text-sky-400" />
							</div>
							<div class="min-w-0 flex-1">
								<h3 class="font-semibold group-hover:text-sky-400">{{ repo.name }}</h3>
								<p class="text-sm text-slate-400">{{ repo.description }}</p>
								<p class="mt-1 text-xs text-slate-500">{{ repo.stack }}</p>
							</div>
							<UIcon name="i-lucide-external-link" class="shrink-0 text-slate-500" />
						</NuxtLink>
					</div>
				</div>
			</UContainer>
		</section>

		<!-- Roadmap teaser -->
		<section class="bg-slate-950/30 py-24">
			<UContainer>
				<SectionHeading
					badge="Roadmap"
					title="1.0 is the beginning"
					description="Here's a taste of what's planned after the first stable release. The full roadmap is public — and shaped by the people who use Delivr."
				/>
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
					<IconCard
						v-for="item in roadmapHighlights"
						:key="item.title"
						:icon="item.icon"
						:title="item.title"
						:description="item.summary"
					/>
				</div>
				<div class="mt-10 text-center">
					<UButton to="/roadmap" color="neutral" variant="outline" size="lg" icon="i-lucide-map">
						See the full roadmap
					</UButton>
				</div>
			</UContainer>
		</section>

		<!-- Self-host quick start -->
		<section id="self-host" class="py-24">
			<UContainer>
				<SectionHeading
					badge="Get Started"
					title="Up and running in five minutes"
					description="Delivr ships as two container images. Point them at a domain, put a reverse proxy in front, and you're live."
				/>

				<div class="mx-auto max-w-3xl">
					<UCard class="border-slate-800 bg-black">
						<div class="space-y-6 p-2 sm:p-4">
							<pre
								class="overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-300"
							><code><span class="text-slate-500"># 1. Grab the Compose file and an encryption key</span>
<span class="text-slate-500">$</span> mkdir delivr &amp;&amp; cd delivr
<span class="text-slate-500">$</span> curl -o docker-compose.yml https://www.delivr.email/static/docker-compose.yml
<span class="text-slate-500">$</span> openssl rand -hex 16   <span class="text-slate-500"># → DLA_ENCRYPTION_KEY</span>

<span class="text-slate-500"># 2. Set your domains and key, then start Delivr</span>
<span class="text-slate-500">$</span> docker compose up -d

<span class="text-slate-500"># 3. Open the one-time admin setup link</span>
<span class="text-slate-500">$</span> docker compose logs delivr-api | grep reset-password</code></pre>
							<div class="flex flex-col justify-center gap-4 sm:flex-row">
								<UButton to="/docs/self-hosting/docker" color="primary" icon="i-lucide-container" class="justify-center px-6">
									Docker guide
								</UButton>
								<UButton
									to="/docs/self-hosting/reverse-proxy"
									color="neutral"
									variant="outline"
									icon="i-lucide-network"
									class="justify-center px-6"
								>
									Reverse proxy setup
								</UButton>
								<UButton to="/docs/configuration" color="neutral" variant="outline" icon="i-lucide-settings-2" class="justify-center px-6">
									Configuration
								</UButton>
							</div>
						</div>
					</UCard>
				</div>
			</UContainer>
		</section>

		<!-- FAQ -->
		<section class="bg-slate-950/30 py-24">
			<UContainer>
				<SectionHeading badge="FAQ" title="Questions, answered" />
				<div class="mx-auto max-w-3xl">
					<UAccordion
						:items="faqs"
						:ui="{
							trigger: 'text-base font-semibold py-4',
							body: 'text-slate-400 leading-relaxed pb-5',
						}"
					/>
					<p class="mt-8 text-center text-slate-500">
						More questions? Check the
						<NuxtLink to="/docs/faq" class="text-sky-400 hover:underline">full FAQ</NuxtLink>
						or ask on
						<NuxtLink :to="githubOrgUrl" target="_blank" class="text-sky-400 hover:underline">GitHub</NuxtLink>.
					</p>
				</div>
			</UContainer>
		</section>

		<CtaSection />
	</div>
</template>
