<script setup lang="ts">
import CtaSection from "~/components/marketing/CtaSection.vue";
import IconCard from "~/components/marketing/IconCard.vue";
import PageHero from "~/components/marketing/PageHero.vue";
import SectionHeading from "~/components/marketing/SectionHeading.vue";
import { githubOrgUrl, repositories } from "~/data/project";

usePageSeo({
	title: "Open Source — Delivr",
	description:
		"Delivr is free software under the GNU AGPL-3.0. Learn what the license means for you, explore the repositories, and find out how to contribute.",
	canonical: "https://www.delivr.email/open-source",
});

const licenseCards = [
	{
		icon: "i-lucide-circle-play",
		title: "Use it for anything",
		description:
			"Run Delivr for yourself, your family, your non-profit, or your company — free of charge.",
	},
	{
		icon: "i-lucide-search-code",
		title: "Study and change it",
		description: "Read every line, audit the security, and adapt Delivr to your needs.",
	},
	{
		icon: "i-lucide-share-2",
		title: "Host it for others",
		description: "Offer Delivr to your users or customers on your own infrastructure.",
	},
	{
		icon: "i-lucide-repeat",
		title: "Share alike",
		description:
			"If you modify Delivr and let people use it over a network, you must offer them your modified source code too.",
	},
];

const contributions = [
	{
		icon: "i-lucide-bug",
		title: "Report bugs",
		description:
			"Found something broken? A clear issue with steps to reproduce is a real contribution.",
		to: "https://github.com/Delivr-Project/Delivr-Web/issues/new",
		cta: "Open an issue",
	},
	{
		icon: "i-lucide-lightbulb",
		title: "Suggest features",
		description:
			"Tell us what your inbox is missing, or add your 👍 and use case to an existing request.",
		to: "/roadmap",
		cta: "Browse the roadmap",
	},
	{
		icon: "i-lucide-code-xml",
		title: "Write code",
		description:
			"Pick an issue, open a pull request, and we'll review it together. TypeScript all the way.",
		to: "/docs/contributing",
		cta: "Contributing guide",
	},
	{
		icon: "i-lucide-book-open-text",
		title: "Improve the docs",
		description:
			"Every page on this site is Markdown on GitHub — fix a typo or write the guide you wish existed.",
		to: "https://github.com/Delivr-Project/Website",
		cta: "Edit the docs",
	},
	{
		icon: "i-lucide-languages",
		title: "Translate",
		description:
			"Translation support is on the roadmap. Native speakers who want to help are very welcome.",
		to: "https://github.com/Delivr-Project/Delivr-Web/issues/91",
		cta: "Follow the issue",
	},
	{
		icon: "i-lucide-star",
		title: "Spread the word",
		description:
			"Star the repositories, write about your setup, and tell your friends there's a better inbox.",
		to: githubOrgUrl,
		cta: "Star on GitHub",
	},
];

const openPractices = [
	{
		icon: "i-lucide-kanban",
		title: "Public roadmap",
		description: "Plans live on public GitHub project boards — not in a private tracker.",
	},
	{
		icon: "i-lucide-git-pull-request",
		title: "Reviewed pull requests",
		description: "Features and fixes land through pull requests that anyone can read and comment on.",
	},
	{
		icon: "i-lucide-flask-conical",
		title: "Tested in CI",
		description:
			"Type-checking and integration tests run on every push, against mock IMAP/SMTP servers.",
	},
	{
		icon: "i-lucide-messages-square",
		title: "Open discussions",
		description:
			"Feature ideas and design questions are discussed in public GitHub issues, not behind closed doors.",
	},
];

const stack = [
	"Bun",
	"Hono",
	"Drizzle ORM",
	"Zod",
	"imapflow",
	"Nodemailer",
	"postal-mime",
	"Scalar",
	"Nuxt 4",
	"Vue 3",
	"Nuxt UI",
	"Vite PWA",
	"DOMPurify",
	"Hey API",
	"Lucide",
	"TypeScript",
];
</script>

<template>
	<div>
		<PageHero
			badge="Open Source"
			badge-icon="i-lucide-code-xml"
			title="Free software, built in the open"
			description="Delivr is licensed under the GNU AGPL-3.0. The code, the roadmap, the bugs, and the discussions are all public — and you're invited."
		>
			<template #title>
				Free software,
				<span class="bg-linear-to-tr from-sky-400 to-sky-200 bg-clip-text text-transparent">built in the open</span>
			</template>
			<template #actions>
				<UButton :to="githubOrgUrl" target="_blank" size="xl" color="primary" icon="i-lucide-github" class="justify-center px-6">
					Delivr on GitHub
				</UButton>
				<UButton
					to="/docs/contributing"
					size="xl"
					color="neutral"
					variant="outline"
					icon="i-lucide-git-pull-request"
					class="justify-center px-6"
				>
					How to contribute
				</UButton>
			</template>
		</PageHero>

		<!-- License -->
		<section class="py-20">
			<UContainer>
				<SectionHeading
					badge="AGPL-3.0"
					title="What the license means for you"
					description="The GNU Affero General Public License keeps Delivr free — for you and for everyone who uses an instance."
				/>
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
					<IconCard
						v-for="card in licenseCards"
						:key="card.title"
						:icon="card.icon"
						:title="card.title"
						:description="card.description"
					/>
				</div>
				<p class="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
					This is a plain-language summary, not legal advice. The
					<NuxtLink
						to="https://www.gnu.org/licenses/agpl-3.0.html"
						target="_blank"
						class="text-sky-400 hover:underline"
						>full license text</NuxtLink
					>
					is what counts.
				</p>
			</UContainer>
		</section>

		<!-- Repositories -->
		<section class="bg-slate-950/30 py-24">
			<UContainer>
				<SectionHeading
					badge="Repositories"
					title="Three repos, one project"
					description="Each part of Delivr lives in its own repository, with its own issues and its own README."
				/>
				<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
					<NuxtLink
						v-for="repo in repositories"
						:key="repo.name"
						:to="repo.to"
						target="_blank"
						class="group flex flex-col rounded-xl border border-slate-800 bg-black p-6 transition hover:-translate-y-1 hover:border-sky-400/50"
					>
						<div class="mb-4 flex items-center justify-between">
							<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900">
								<UIcon :name="repo.icon" class="text-xl text-sky-400" />
							</div>
							<UIcon name="i-lucide-external-link" class="text-slate-500" />
						</div>
						<h3 class="mb-2 text-lg font-semibold group-hover:text-sky-400">{{ repo.name }}</h3>
						<p class="mb-4 flex-1 text-slate-400">{{ repo.description }}</p>
						<p class="text-sm text-slate-500">{{ repo.stack }}</p>
					</NuxtLink>
				</div>
			</UContainer>
		</section>

		<!-- Contribute -->
		<section class="py-24">
			<UContainer>
				<SectionHeading
					badge="Get involved"
					title="Every contribution counts"
					description="You don't have to write code to make Delivr better. Here's where you can help."
				/>
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
					<IconCard
						v-for="item in contributions"
						:key="item.title"
						:icon="item.icon"
						:title="item.title"
						:description="item.description"
					>
						<UButton
							:to="item.to"
							:target="item.to.startsWith('http') ? '_blank' : undefined"
							color="primary"
							variant="link"
							trailing-icon="i-lucide-arrow-right"
							class="px-0"
						>
							{{ item.cta }}
						</UButton>
					</IconCard>
				</div>
			</UContainer>
		</section>

		<!-- Practices -->
		<section class="bg-slate-950/30 py-24">
			<UContainer>
				<SectionHeading
					badge="Transparency"
					title="How we work in the open"
					description="Open source is more than a license. It's how decisions get made."
				/>
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
					<IconCard
						v-for="practice in openPractices"
						:key="practice.title"
						:icon="practice.icon"
						:title="practice.title"
						:description="practice.description"
					/>
				</div>
			</UContainer>
		</section>

		<!-- Stack -->
		<section class="py-24">
			<UContainer>
				<SectionHeading
					badge="Thank you"
					title="Standing on the shoulders of giants"
					description="Delivr is built on outstanding open-source projects. We're grateful to every one of their maintainers."
				/>
				<div class="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
					<span
						v-for="item in stack"
						:key="item"
						class="rounded-full border border-slate-800 bg-black px-4 py-2 text-sm text-slate-300"
					>
						{{ item }}
					</span>
				</div>
			</UContainer>
		</section>

		<CtaSection />
	</div>
</template>
