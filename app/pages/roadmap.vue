<script setup lang="ts">
import CtaSection from "~/components/marketing/CtaSection.vue";
import PageHero from "~/components/marketing/PageHero.vue";
import SectionHeading from "~/components/marketing/SectionHeading.vue";
import { type RoadmapStatus, roadmapItems, roadmapStatuses, shippedInV1 } from "~/data/roadmap";

usePageSeo({
	title: "Roadmap — Delivr",
	description:
		"What's shipping in Delivr 1.0 and what comes next: shared team inboxes, an offline-first PWA, end-to-end encryption, enterprise SSO, local AI spam detection, calendars and contacts.",
	canonical: "https://www.delivr.email/roadmap",
});

const statusOrder: RoadmapStatus[] = ["planned", "exploring"];

const sections = statusOrder.map((status) => ({
	status,
	...roadmapStatuses[status],
	items: roadmapItems.filter((item) => item.status === status),
}));

const boards = [
	{
		label: "Delivr Web board",
		to: "https://github.com/orgs/Delivr-Project/projects/1",
	},
	{
		label: "Delivr API board",
		to: "https://github.com/orgs/Delivr-Project/projects/2",
	},
];
</script>

<template>
	<div>
		<PageHero
			badge="Roadmap"
			badge-icon="i-lucide-map"
			title="Where Delivr is headed"
			description="Delivr 1.0 is the foundation: a fast, private, standards-based mail client. Here's what's in it and what we're building on top — planned in public, shaped by the people who use it."
		>
			<template #title>
				Where Delivr is
				<span class="bg-linear-to-tr from-sky-400 to-sky-200 bg-clip-text text-transparent">headed</span>
			</template>
			<template #actions>
				<UButton
					v-for="board in boards"
					:key="board.to"
					:to="board.to"
					target="_blank"
					size="xl"
					color="neutral"
					variant="outline"
					icon="i-lucide-kanban"
					class="justify-center px-6"
				>
					{{ board.label }}
				</UButton>
			</template>
		</PageHero>

		<!-- 1.0 -->
		<section class="py-20">
			<UContainer>
				<SectionHeading
					badge="Delivr 1.0"
					title="What's in the first stable release"
					description="Everything below is built, reviewed, and merged — 1.0 wraps it up with final polish."
				/>
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
					<UCard v-for="group in shippedInV1" :key="group.title" class="border-slate-800 bg-black">
						<div class="p-2">
							<div class="mb-4 flex items-center gap-3">
								<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10">
									<UIcon :name="group.icon" class="text-lg text-sky-400" />
								</div>
								<h3 class="text-lg font-semibold">{{ group.title }}</h3>
							</div>
							<ul class="space-y-2 text-sm text-slate-400">
								<li v-for="item in group.items" :key="item" class="flex gap-2">
									<UIcon name="i-lucide-circle-check" class="mt-0.5 shrink-0 text-emerald-400" />
									{{ item }}
								</li>
							</ul>
						</div>
					</UCard>
				</div>
			</UContainer>
		</section>

		<!-- Planned / Exploring -->
		<section
			v-for="(section, index) in sections"
			:key="section.status"
			class="py-20"
			:class="index % 2 === 0 ? 'bg-slate-950/30' : ''"
		>
			<UContainer>
				<header class="mb-12 flex flex-col items-center gap-3 text-center">
					<div class="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/10">
						<UIcon :name="section.icon" class="text-xl text-sky-400" />
					</div>
					<h2 class="text-3xl font-bold sm:text-4xl">{{ section.label }}</h2>
					<p class="max-w-2xl text-lg text-slate-400">{{ section.description }}</p>
				</header>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
					<UCard
						v-for="item in section.items"
						:key="item.title"
						class="border-slate-800 bg-black transition hover:border-sky-400/50"
						:ui="{ body: 'h-full' }"
					>
						<div class="flex h-full flex-col gap-3 p-2">
							<div class="flex items-start justify-between gap-3">
								<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-500/10">
									<UIcon :name="item.icon" class="text-xl text-sky-400" />
								</div>
								<div class="flex gap-1">
									<UBadge v-for="area in item.areas" :key="area" color="neutral" variant="subtle" size="sm">
										{{ area }}
									</UBadge>
								</div>
							</div>
							<h3 class="text-lg font-semibold">{{ item.title }}</h3>
							<p class="flex-1 leading-relaxed text-slate-400">{{ item.summary }}</p>
							<div v-if="item.issues.length" class="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-sm">
								<NuxtLink
									v-for="issue in item.issues"
									:key="issue.to"
									:to="issue.to"
									target="_blank"
									class="inline-flex items-center gap-1 text-sky-400 hover:underline"
								>
									<UIcon name="i-lucide-circle-dot" class="text-xs" />
									{{ issue.label }}
								</NuxtLink>
							</div>
							<p v-else class="pt-1 text-sm text-slate-500">Open for discussion — no issue yet.</p>
						</div>
					</UCard>
				</div>
			</UContainer>
		</section>

		<!-- Shape it -->
		<section class="py-20">
			<UContainer>
				<div
					class="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-linear-to-br from-sky-500/10 via-black to-black p-8 sm:p-12"
				>
					<div class="grid items-center gap-8 md:grid-cols-3">
						<div class="md:col-span-2">
							<h2 class="mb-3 text-2xl font-bold sm:text-3xl">Help shape the roadmap</h2>
							<p class="text-slate-400">
								Add a 👍 to the issues you care about, comment with your use case, or open a new feature
								request. The most-wanted features move up — and pull requests move them up fastest.
							</p>
						</div>
						<div class="flex flex-col gap-3">
							<UButton
								to="https://github.com/Delivr-Project/Delivr-Web/issues/new"
								target="_blank"
								color="primary"
								icon="i-lucide-lightbulb"
								class="justify-center"
							>
								Request a feature
							</UButton>
							<UButton to="/docs/contributing" color="neutral" variant="outline" icon="i-lucide-git-pull-request" class="justify-center">
								Contribute
							</UButton>
						</div>
					</div>
				</div>
				<p class="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
					The roadmap describes current plans, not promises. Priorities can change as we learn — the
					project boards on GitHub are always the most up-to-date source.
				</p>
			</UContainer>
		</section>

		<CtaSection />
	</div>
</template>
