<script setup lang="ts">
import CtaSection from "~/components/marketing/CtaSection.vue";
import IconCard from "~/components/marketing/IconCard.vue";
import PageHero from "~/components/marketing/PageHero.vue";
import SectionHeading from "~/components/marketing/SectionHeading.vue";

usePageSeo({
	title: "Philosophy — Delivr",
	description:
		"Why Delivr exists and the principles behind it: your mail on your server, open standards over lock-in, privacy by default, and open source all the way down.",
	canonical: "https://www.delivr.email/about",
});

const principles = [
	{
		icon: "i-lucide-server",
		title: "Your mail, your server",
		description:
			"Delivr is a client, not a silo. Your messages stay on your IMAP server — Delivr reads them live and never builds a copy of its own.",
	},
	{
		icon: "i-lucide-plug-zap",
		title: "Open standards over lock-in",
		description:
			"IMAP and SMTP today, CalDAV and CardDAV tomorrow. If you ever leave, every other mail client still works with your mailbox. Nothing to export.",
	},
	{
		icon: "i-lucide-eye-off",
		title: "Private by default",
		description:
			"Remote content is blocked until you allow it, nothing is tracked, and there is no telemetry. Privacy isn't a toggle you have to find.",
	},
	{
		icon: "i-lucide-code-xml",
		title: "Open source, all of it",
		description:
			"The web client and the API are both AGPL-3.0. Anyone can read, audit, and improve the code — and improvements stay open for everyone.",
	},
	{
		icon: "i-lucide-container",
		title: "Self-hosting is first-class",
		description:
			"Container images, sane defaults, an SQLite database that just works, and documentation that assumes you have better things to do.",
	},
	{
		icon: "i-lucide-zap",
		title: "Fast and focused",
		description:
			"A clean, dark-first interface that loads like an app and gets out of your way. Features earn their place; clutter doesn't.",
	},
];

const neverList = [
	{ icon: "i-lucide-megaphone-off", text: "Show you ads or sponsored messages" },
	{ icon: "i-lucide-scan-eye", text: "Scan your mail to build a profile of you" },
	{ icon: "i-lucide-hand-coins", text: "Sell, rent, or share your data" },
	{ icon: "i-lucide-radio-tower", text: "Phone home with telemetry or analytics" },
	{ icon: "i-lucide-lock", text: "Lock your mail into a proprietary format" },
];

type Support = "yes" | "no" | "varies";

const comparison: { feature: string; delivr: Support; bigTech: Support; legacy: Support }[] = [
	{ feature: "Works with any IMAP/SMTP mailbox", delivr: "yes", bigTech: "varies", legacy: "yes" },
	{ feature: "Self-hostable on your own server", delivr: "yes", bigTech: "no", legacy: "yes" },
	{ feature: "Open source", delivr: "yes", bigTech: "no", legacy: "varies" },
	{ feature: "Modern, installable app experience", delivr: "yes", bigTech: "yes", legacy: "no" },
	{ feature: "No ads, tracking, or data mining", delivr: "yes", bigTech: "no", legacy: "yes" },
	{ feature: "Documented REST API", delivr: "yes", bigTech: "varies", legacy: "no" },
	{
		feature: "Your mail stays out of the vendor's hands",
		delivr: "yes",
		bigTech: "no",
		legacy: "yes",
	},
];

const supportIcon: Record<Support, { icon: string; class: string; label: string }> = {
	yes: { icon: "i-lucide-circle-check", class: "text-emerald-400", label: "Yes" },
	no: { icon: "i-lucide-circle-x", class: "text-rose-400", label: "No" },
	varies: { icon: "i-lucide-circle-minus", class: "text-slate-500", label: "Varies" },
};

const audiences = [
	{
		icon: "i-lucide-user-round",
		title: "Individuals & families",
		description:
			"Bring all your addresses into one beautiful inbox on every device — without handing your inbox to an ad company.",
	},
	{
		icon: "i-lucide-briefcase",
		title: "Teams & businesses",
		description:
			"One instance for the whole company, admin-managed users, and a roadmap toward shared inboxes and single sign-on.",
	},
	{
		icon: "i-lucide-server-cog",
		title: "Hosters & IT providers",
		description:
			"Offer a modern webmail experience on top of the mail servers you already run for your customers.",
	},
	{
		icon: "i-lucide-terminal",
		title: "Developers",
		description:
			"A clean, versioned REST API with OpenAPI docs and API keys — automate your mail without screen-scraping.",
	},
];
</script>

<template>
	<div>
		<PageHero
			badge="Our Philosophy"
			badge-icon="i-lucide-compass"
			title="Email should belong to the people who use it"
			description="Delivr is a modern mail client built on a simple belief: you shouldn't have to trade your privacy, your data, or your freedom to switch for a good inbox."
		>
			<template #title>
				Email should belong to the
				<span class="bg-linear-to-tr from-sky-400 to-sky-200 bg-clip-text text-transparent">people who use it</span>
			</template>
		</PageHero>

		<!-- Story -->
		<section class="py-20">
			<UContainer>
				<div class="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
					<div class="lg:col-span-3">
						<UBadge color="primary" variant="soft" size="xl" class="mb-3">Why Delivr exists</UBadge>
						<div class="space-y-5 text-lg leading-relaxed text-slate-300">
							<p>
								Email is the most open communication network ever built. Anyone can run a server, any
								client can talk to any server, and nobody owns it. That's remarkable — and worth
								protecting.
							</p>
							<p>
								Yet the inboxes most people use fall into two camps: closed platforms that pay for
								themselves with your attention and your data, and self-hosted webmail that hasn't felt
								modern in a decade. If you care about privacy, you're asked to accept a worse
								experience.
							</p>
							<p>
								Delivr is the third option. A fast, installable, genuinely modern client — paired with a
								self-hosted, open-source backend that speaks the same open protocols as everything
								else. You get the experience you expect from big-tech mail, on infrastructure you
								control.
							</p>
						</div>
					</div>
					<div class="lg:col-span-2">
						<figure
							class="sticky top-24 rounded-2xl border border-slate-800 bg-linear-to-br from-sky-500/10 via-black to-black p-8"
						>
							<UIcon name="i-lucide-quote" class="mb-4 text-3xl text-sky-400" />
							<blockquote class="text-xl leading-relaxed font-medium text-slate-100">
								A mail client should be a window onto your mailbox — not a new place your mail has to
								live.
							</blockquote>
							<figcaption class="mt-4 text-sm text-slate-500">— The idea behind Delivr</figcaption>
						</figure>
					</div>
				</div>
			</UContainer>
		</section>

		<!-- Principles -->
		<section class="bg-slate-950/30 py-24">
			<UContainer>
				<SectionHeading
					badge="Principles"
					title="What we build on"
					description="Six principles guide every feature, every review, and every trade-off we make."
				/>
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
					<IconCard
						v-for="principle in principles"
						:key="principle.title"
						:icon="principle.icon"
						:title="principle.title"
						:description="principle.description"
					/>
				</div>
			</UContainer>
		</section>

		<!-- Never -->
		<section class="py-24">
			<UContainer>
				<div class="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
					<div>
						<UBadge color="primary" variant="soft" size="xl" class="mb-3">Our promise</UBadge>
						<h2 class="mb-4 text-3xl font-bold text-balance sm:text-4xl">What Delivr is built never to do</h2>
						<p class="text-lg text-slate-400">
							Some things aren't features we left out — they're things the architecture makes
							impossible or pointless. And because the code is open, you can check every one of them.
						</p>
					</div>
					<ul class="space-y-3">
						<li
							v-for="item in neverList"
							:key="item.text"
							class="flex items-center gap-4 rounded-xl border border-slate-800 bg-black p-4"
						>
							<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/10">
								<UIcon :name="item.icon" class="text-lg text-rose-400" />
							</div>
							<span class="font-medium text-slate-200">{{ item.text }}</span>
						</li>
					</ul>
				</div>
			</UContainer>
		</section>

		<!-- Comparison -->
		<section class="bg-slate-950/30 py-24">
			<UContainer>
				<SectionHeading
					badge="Comparison"
					title="The best of both worlds"
					description="Delivr combines the experience of big-tech webmail with the freedom of running your own."
				/>
				<div class="mx-auto max-w-4xl overflow-x-auto rounded-xl border border-slate-800 bg-black">
					<table class="w-full min-w-xl text-left text-sm">
						<thead>
							<tr class="border-b border-slate-800 text-slate-400">
								<th scope="col" class="p-4 font-medium">Feature</th>
								<th scope="col" class="p-4 text-center font-semibold text-sky-300">Delivr</th>
								<th scope="col" class="p-4 text-center font-medium">Big-tech webmail</th>
								<th scope="col" class="p-4 text-center font-medium">Classic self-hosted webmail</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="row in comparison" :key="row.feature" class="border-b border-slate-900 last:border-0">
								<th scope="row" class="p-4 font-normal text-slate-300">{{ row.feature }}</th>
								<td v-for="key in ['delivr', 'bigTech', 'legacy'] as const" :key="key" class="p-4 text-center">
									<UIcon
										:name="supportIcon[row[key]].icon"
										:class="supportIcon[row[key]].class"
										class="text-lg"
										:aria-label="supportIcon[row[key]].label"
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<p class="mt-4 text-center text-sm text-slate-500">
					<UIcon name="i-lucide-circle-minus" class="align-middle text-slate-500" /> = depends on the product
				</p>
			</UContainer>
		</section>

		<!-- Audiences -->
		<section class="py-24">
			<UContainer>
				<SectionHeading badge="Who it's for" title="Made for people who take email seriously" />
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
					<IconCard
						v-for="audience in audiences"
						:key="audience.title"
						:icon="audience.icon"
						:title="audience.title"
						:description="audience.description"
					/>
				</div>
			</UContainer>
		</section>

		<!-- Project -->
		<section class="bg-slate-950/30 py-24">
			<UContainer>
				<div class="mx-auto max-w-3xl text-center">
					<UBadge color="primary" variant="soft" size="xl" class="mb-3">The project</UBadge>
					<h2 class="mb-4 text-3xl font-bold sm:text-4xl">Independent and community-driven</h2>
					<p class="mb-8 text-lg text-slate-400">
						Delivr is developed in the open by the Delivr Project, based in Germany, together with
						contributors from the community. Decisions happen in public issues and pull requests, guided
						by the people who actually use it.
					</p>
					<div class="flex flex-col justify-center gap-4 sm:flex-row">
						<UButton to="/open-source" color="primary" icon="i-lucide-heart-handshake" class="justify-center">
							Get involved
						</UButton>
						<UButton to="/roadmap" color="neutral" variant="outline" icon="i-lucide-map" class="justify-center">
							See the roadmap
						</UButton>
						<UButton
							to="mailto:support@delivr.email"
							color="neutral"
							variant="outline"
							icon="i-lucide-mail"
							class="justify-center"
						>
							support@delivr.email
						</UButton>
					</div>
				</div>
			</UContainer>
		</section>

		<CtaSection />
	</div>
</template>
