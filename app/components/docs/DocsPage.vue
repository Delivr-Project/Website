<script setup lang="ts">
import { type DocsPage, docsPagesFlat, docsSections } from "~/data/docs";

const route = useRoute();

const currentPath = computed(() => route.path);

const currentIndex = computed(() =>
	docsPagesFlat.findIndex((page) => page.to === currentPath.value),
);

const prevPage = computed<DocsPage | null>(() =>
	currentIndex.value > 0 ? docsPagesFlat[currentIndex.value - 1] : null,
);

const nextPage = computed<DocsPage | null>(() =>
	currentIndex.value >= 0 && currentIndex.value < docsPagesFlat.length - 1
		? docsPagesFlat[currentIndex.value + 1]
		: null,
);
</script>

<template>
	<div class="mx-auto flex w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
		<!-- Sidebar -->
		<aside class="sticky top-20 hidden h-fit w-56 shrink-0 lg:block">
			<nav class="space-y-6" aria-label="Documentation">
				<div v-for="section in docsSections" :key="section.label" class="space-y-1">
					<p class="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
						{{ section.label }}
					</p>
					<NuxtLink
						v-for="page in section.pages"
						:key="page.to"
						:to="page.to"
						class="block rounded-md px-3 py-1.5 text-sm transition-colors"
						:class="
							page.to === currentPath
								? 'bg-sky-500/10 text-sky-400'
								: 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
						"
					>
						{{ page.title }}
					</NuxtLink>
				</div>
			</nav>
		</aside>

		<!-- Content -->
		<div class="min-w-0 flex-1">
			<slot />

			<!-- Prev / Next -->
			<div class="not-prose mt-12 flex flex-col gap-4 border-t border-slate-800 pt-8 sm:flex-row sm:justify-between">
				<NuxtLink
					v-if="prevPage"
					:to="prevPage.to"
					class="group flex flex-1 flex-col gap-1 rounded-lg border border-slate-800 bg-slate-900/50 p-4 transition hover:border-sky-400/50 sm:max-w-xs"
				>
					<span class="flex items-center gap-1 text-xs text-slate-500">
						<UIcon name="i-lucide-arrow-left" class="text-sm" />
						Previous
					</span>
					<span class="font-medium text-slate-200 group-hover:text-sky-400">{{ prevPage.title }}</span>
				</NuxtLink>
				<span v-else class="hidden sm:block sm:flex-1 sm:max-w-xs" aria-hidden="true" />
				<NuxtLink
					v-if="nextPage"
					:to="nextPage.to"
					class="group flex flex-1 flex-col gap-1 rounded-lg border border-slate-800 bg-slate-900/50 p-4 text-right transition hover:border-sky-400/50 sm:max-w-xs"
				>
					<span class="flex items-center justify-end gap-1 text-xs text-slate-500">
						Next
						<UIcon name="i-lucide-arrow-right" class="text-sm" />
					</span>
					<span class="font-medium text-slate-200 group-hover:text-sky-400">{{ nextPage.title }}</span>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>
