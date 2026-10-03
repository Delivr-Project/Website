<script setup lang="ts">
import type { ContentTocLink } from "@nuxt/ui";
import { type DocsPage, docsPagesFlat, docsSections } from "~/data/docs";
import { docsEditBaseUrl } from "~/data/project";

const { toc = [], sourcePath } = defineProps<{
	toc?: ContentTocLink[];
	/** Content file path without extension (e.g. `docs/self-hosting/docker`), for the edit link. */
	sourcePath?: string;
}>();

const route = useRoute();

const currentPath = computed(() => route.path.replace(/\/$/, "") || "/");

const currentIndex = computed(() =>
	docsPagesFlat.findIndex((page) => page.to === currentPath.value),
);

const currentSection = computed(() =>
	docsSections.find((section) => section.pages.some((page) => page.to === currentPath.value)),
);

const prevPage = computed<DocsPage | null>(() =>
	currentIndex.value > 0 ? docsPagesFlat[currentIndex.value - 1] : null,
);

const nextPage = computed<DocsPage | null>(() =>
	currentIndex.value >= 0 && currentIndex.value < docsPagesFlat.length - 1
		? docsPagesFlat[currentIndex.value + 1]
		: null,
);

const editUrl = computed(() => (sourcePath ? `${docsEditBaseUrl}/${sourcePath}.md` : null));

const mobileNavOpen = ref(false);

watch(currentPath, () => {
	mobileNavOpen.value = false;
});
</script>

<template>
	<div class="mx-auto flex w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
		<!-- Sidebar -->
		<aside class="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-56 shrink-0 overflow-y-auto pb-8 lg:block">
			<DocsNavigation :current-path="currentPath" />
		</aside>

		<!-- Content -->
		<div class="min-w-0 flex-1">
			<!-- Mobile navigation -->
			<div class="mb-6 flex items-center gap-3 lg:hidden">
				<USlideover v-model:open="mobileNavOpen" side="left" title="Documentation">
					<UButton color="neutral" variant="outline" icon="i-lucide-menu" size="sm">Docs menu</UButton>
					<template #body>
						<DocsNavigation :current-path="currentPath" />
					</template>
				</USlideover>
				<span v-if="currentSection" class="truncate text-sm text-slate-500">{{ currentSection.label }}</span>
			</div>

			<UContentToc v-if="toc.length" :links="toc" title="On this page" class="mb-6 xl:hidden" />

			<p v-if="currentSection" class="mb-2 hidden text-sm font-semibold text-sky-400 lg:block">
				{{ currentSection.label }}
			</p>

			<slot />

			<div v-if="editUrl" class="not-prose mt-12 flex justify-end">
				<UButton
					:to="editUrl"
					target="_blank"
					color="neutral"
					variant="link"
					icon="i-lucide-square-pen"
					size="sm"
				>
					Edit this page on GitHub
				</UButton>
			</div>

			<!-- Prev / Next -->
			<div class="not-prose mt-6 flex flex-col gap-4 border-t border-slate-800 pt-8 sm:flex-row sm:justify-between">
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

		<!-- On this page -->
		<aside v-if="toc.length" class="hidden w-56 shrink-0 xl:block">
			<UContentToc
				:links="toc"
				title="On this page"
				highlight
				class="top-20 max-h-[calc(100vh-6rem)] bg-transparent"
			/>
		</aside>
	</div>
</template>
