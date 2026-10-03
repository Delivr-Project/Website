<script setup lang="ts">
import CtaSection from "~/components/marketing/CtaSection.vue";
import PageHero from "~/components/marketing/PageHero.vue";
import SectionHeading from "~/components/marketing/SectionHeading.vue";
import { securityAdvisoryUrl } from "~/data/project";

usePageSeo({
	title: "Security — Delivr",
	description:
		"How Delivr protects your mail: AES-256-GCM encrypted credentials, Argon2id-hashed tokens, no mail stored at rest, sanitized rendering, rate limiting, and responsible disclosure.",
	canonical: "https://www.delivr.email/security",
});

const flow = [
	{
		icon: "i-lucide-monitor-smartphone",
		title: "Your device",
		subtitle: "Delivr Web (PWA)",
		holds: ["Your session cookie", "Sanitized HTML rendering", "Remote content blocked by default"],
	},
	{
		icon: "i-lucide-server",
		title: "Your Delivr instance",
		subtitle: "Delivr API",
		holds: [
			"Encrypted IMAP/SMTP credentials",
			"Hashed session tokens & API keys",
			"Preferences — but no mail",
		],
	},
	{
		icon: "i-lucide-mail",
		title: "Your mail server",
		subtitle: "Any IMAP/SMTP provider",
		holds: [
			"All of your mail, exactly as before",
			"Your folders and flags",
			"Your sent items and drafts",
		],
	},
];

const pillars = [
	{
		icon: "i-lucide-lock-keyhole",
		title: "Credentials encrypted at rest",
		points: [
			"IMAP/SMTP credentials are encrypted with AES-256-GCM, using a fresh random IV for every record.",
			"The key is derived from DLA_ENCRYPTION_KEY, which lives in your environment — never in the database.",
			"A leaked database backup alone does not reveal anyone's mail password.",
		],
	},
	{
		icon: "i-lucide-fingerprint",
		title: "Sessions & API keys",
		points: [
			"Tokens are 256-bit random secrets with recognizable prefixes (dla_sess_, dla_apikey_) for secret scanners.",
			"Only Argon2id hashes are stored — the plaintext token is shown exactly once.",
			"Sessions expire after 7 days; API keys can expire and can be revoked any time.",
			"Changing your username, email address, or password requires your current password.",
		],
	},
	{
		icon: "i-lucide-timer-reset",
		title: "Brute-force protection",
		points: [
			"Sign-in attempts are limited to five per client and username, and fifteen per username overall, in any five-minute window.",
			"Unknown usernames take as long to reject as wrong passwords, so attackers can't probe which accounts exist.",
		],
	},
	{
		icon: "i-lucide-database-zap",
		title: "No mail at rest",
		points: [
			"Messages are fetched live from IMAP and parsed in memory. There is no mail cache or search index on the server.",
			"Attachments are re-fetched on demand and streamed with Cache-Control: no-store and X-Content-Type-Options: nosniff.",
			"Only IMAP connections are pooled — never message data.",
		],
	},
	{
		icon: "i-lucide-file-check-2",
		title: "Safe rendering",
		points: [
			"Every HTML email is sanitized with DOMPurify before it is displayed.",
			"Remote images and other external content are blocked until you allow them, per sender or per domain.",
			"Inline preview is limited to inert types (PDF and raster images — not SVG or HTML), enforced in both the browser and the server.",
		],
	},
	{
		icon: "i-lucide-shield-check",
		title: "API hygiene",
		points: [
			"CORS only admits the origin configured in DLA_APP_URL.",
			"Errors return generic messages — no stack traces or validation internals.",
			"The interactive API reference can be switched off in production with one variable.",
		],
	},
	{
		icon: "i-lucide-badge-check",
		title: "Phishing signals",
		points: [
			"Senders with a valid BIMI record show their verified brand logo, making look-alike senders easier to spot.",
			"BIMI is resolved from DNS metadata only; the logo is never fetched or stored by the server.",
		],
	},
	{
		icon: "i-lucide-git-pull-request",
		title: "Transparent development",
		points: [
			"All code is public and changes land through reviewed pull requests.",
			"Every change runs type-checking and an integration test suite against mock IMAP/SMTP servers.",
			"Container images are built by GitHub Actions and published to the GitHub Container Registry.",
		],
	},
];

const operatorChecklist = [
	"Serve Delivr only over HTTPS, behind a reverse proxy",
	"Generate a long, random DLA_ENCRYPTION_KEY and keep it out of version control",
	"Back up the database and the encryption key — separately",
	"Keep the container images up to date",
	"Expose only your reverse proxy to the internet",
	"Disable the API reference with DLA_DISABLE_DOCS if you don't need it",
];

const upcoming = [
	{ icon: "i-lucide-key-square", label: "End-to-end encryption with OpenPGP" },
	{ icon: "i-lucide-image", label: "Remote image proxy" },
	{ icon: "i-lucide-shield-alert", label: "Per-message security score" },
	{ icon: "i-lucide-fingerprint", label: "Single sign-on with OIDC & SAML" },
	{ icon: "i-lucide-life-buoy", label: "Recovery codes & recovery email" },
];
</script>

<template>
	<div>
		<PageHero
			badge="Security"
			badge-icon="i-lucide-shield-check"
			title="Secure by design. Verifiable by anyone."
			description="Delivr's safest data is the data it never keeps. Here's exactly what the client and the server do to protect your mail — and how to check it yourself."
		>
			<template #title>
				Secure by design.
				<span class="bg-linear-to-tr from-sky-400 to-sky-200 bg-clip-text text-transparent">Verifiable by anyone.</span>
			</template>
			<template #actions>
				<UButton to="#disclosure" size="xl" color="primary" icon="i-lucide-bug" class="justify-center px-6">
					Report a vulnerability
				</UButton>
				<UButton
					to="/docs/self-hosting/hardening"
					size="xl"
					color="neutral"
					variant="outline"
					icon="i-lucide-list-checks"
					class="justify-center px-6"
				>
					Hardening guide
				</UButton>
			</template>
		</PageHero>

		<!-- Data flow -->
		<section class="py-20">
			<UContainer>
				<SectionHeading
					badge="At a glance"
					title="Where your data lives"
					description="Delivr sits between your browser and your mail server — and is deliberately forgetful in the middle."
				/>
				<div class="mx-auto flex max-w-5xl flex-col items-stretch gap-4 lg:flex-row lg:items-center">
					<template v-for="(node, index) in flow" :key="node.title">
						<div class="flex-1 rounded-xl border border-slate-800 bg-black p-6">
							<div class="mb-4 flex items-center gap-3">
								<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-500/10">
									<UIcon :name="node.icon" class="text-xl text-sky-400" />
								</div>
								<div>
									<h3 class="font-semibold">{{ node.title }}</h3>
									<p class="text-sm text-slate-500">{{ node.subtitle }}</p>
								</div>
							</div>
							<ul class="space-y-2 text-sm text-slate-400">
								<li v-for="item in node.holds" :key="item" class="flex gap-2">
									<UIcon name="i-lucide-dot" class="mt-0.5 shrink-0 text-sky-400" />
									{{ item }}
								</li>
							</ul>
						</div>
						<div
							v-if="index < flow.length - 1"
							class="flex shrink-0 flex-col items-center justify-center gap-1 text-slate-500"
						>
							<UIcon name="i-lucide-arrow-left-right" class="hidden text-xl lg:block" />
							<UIcon name="i-lucide-arrow-up-down" class="text-xl lg:hidden" />
							<span class="text-xs whitespace-nowrap">{{ index === 0 ? "HTTPS" : "IMAP/SMTP + TLS" }}</span>
						</div>
					</template>
				</div>
			</UContainer>
		</section>

		<!-- Pillars -->
		<section class="bg-slate-950/30 py-24">
			<UContainer>
				<SectionHeading
					badge="In detail"
					title="How Delivr protects you"
					description="No marketing hand-waving: these are the mechanisms in the code, which you can read on GitHub."
				/>
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<UCard v-for="pillar in pillars" :key="pillar.title" class="border-slate-800 bg-black">
						<div class="p-2">
							<div class="mb-4 flex items-center gap-3">
								<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10">
									<UIcon :name="pillar.icon" class="text-lg text-sky-400" />
								</div>
								<h3 class="text-lg font-semibold">{{ pillar.title }}</h3>
							</div>
							<ul class="space-y-2 text-slate-400">
								<li v-for="point in pillar.points" :key="point" class="flex gap-2 leading-relaxed">
									<UIcon name="i-lucide-check" class="mt-1 shrink-0 text-sky-400" />
									<span>{{ point }}</span>
								</li>
							</ul>
						</div>
					</UCard>
				</div>
			</UContainer>
		</section>

		<!-- Shared responsibility -->
		<section class="py-24">
			<UContainer>
				<div class="mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-2">
					<div>
						<UBadge color="primary" variant="soft" size="xl" class="mb-3">Shared responsibility</UBadge>
						<h2 class="mb-4 text-3xl font-bold text-balance sm:text-4xl">Self-hosting means you hold the keys</h2>
						<p class="mb-6 text-lg text-slate-400">
							Running your own instance gives you full control — and a few responsibilities. The
							hardening guide walks you through each of them.
						</p>
						<UButton to="/docs/self-hosting/hardening" color="primary" icon="i-lucide-list-checks">
							Production hardening guide
						</UButton>
					</div>
					<UCard class="border-slate-800 bg-black">
						<ul class="space-y-3 p-2">
							<li v-for="item in operatorChecklist" :key="item" class="flex gap-3 text-slate-300">
								<UIcon name="i-lucide-square-check" class="mt-0.5 shrink-0 text-sky-400" />
								{{ item }}
							</li>
						</ul>
					</UCard>
				</div>
			</UContainer>
		</section>

		<!-- Upcoming -->
		<section class="bg-slate-950/30 py-20">
			<UContainer>
				<SectionHeading
					badge="Coming next"
					title="Security on the roadmap"
					description="Security work never stops. These features are planned or being explored for upcoming releases."
				/>
				<div class="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
					<NuxtLink
						v-for="item in upcoming"
						:key="item.label"
						to="/roadmap"
						class="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-black px-4 py-2 text-sm text-slate-300 transition hover:border-sky-400/50 hover:text-sky-300"
					>
						<UIcon :name="item.icon" class="text-sky-400" />
						{{ item.label }}
					</NuxtLink>
				</div>
			</UContainer>
		</section>

		<!-- Disclosure -->
		<section id="disclosure" class="scroll-mt-16 py-24">
			<UContainer>
				<div
					class="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-linear-to-br from-sky-500/10 via-black to-black p-8 sm:p-12"
				>
					<div class="mb-6 flex items-center gap-3">
						<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-500/10">
							<UIcon name="i-lucide-bug" class="text-xl text-sky-400" />
						</div>
						<h2 class="text-2xl font-bold sm:text-3xl">Responsible disclosure</h2>
					</div>
					<div class="space-y-4 text-slate-300">
						<p>
							Found a vulnerability? Thank you — please tell us privately first. Don't open a public issue
							or pull request for security problems.
						</p>
						<ol class="list-decimal space-y-2 pl-5 text-slate-400">
							<li>
								Report it through a
								<NuxtLink :to="securityAdvisoryUrl" target="_blank" class="text-sky-400 hover:underline">
									private GitHub Security Advisory</NuxtLink
								>, or email
								<NuxtLink to="mailto:support@delivr.email" class="text-sky-400 hover:underline">
									support@delivr.email</NuxtLink
								>
								with “Security” in the subject.
							</li>
							<li>Include the affected component and version, steps to reproduce, and the impact you see.</li>
							<li>Give us a reasonable amount of time to ship a fix before disclosing publicly.</li>
						</ol>
						<p class="text-slate-400">
							We'll confirm we received your report, keep you updated while we work on a fix, and credit
							you in the release notes if you'd like.
						</p>
					</div>
					<div class="mt-8 flex flex-col gap-3 sm:flex-row">
						<UButton
							:to="securityAdvisoryUrl"
							target="_blank"
							color="primary"
							icon="i-lucide-shield-alert"
							class="justify-center"
						>
							Open a private advisory
						</UButton>
						<UButton
							to="mailto:support@delivr.email"
							color="neutral"
							variant="outline"
							icon="i-lucide-mail"
							class="justify-center"
						>
							Email the team
						</UButton>
					</div>
				</div>
			</UContainer>
		</section>

		<CtaSection />
	</div>
</template>
