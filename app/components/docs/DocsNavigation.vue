<script setup lang="ts">
import { docsSections } from "~/data/docs";

const { currentPath } = defineProps<{
	currentPath: string;
}>();
</script>

<template>
	<nav class="space-y-6" aria-label="Documentation">
		<div v-for="section in docsSections" :key="section.label" class="space-y-1">
			<p class="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
				{{ section.label }}
			</p>
			<NuxtLink
				v-for="page in section.pages"
				:key="page.to"
				:to="page.to"
				class="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors"
				:class="
					page.to === currentPath
						? 'bg-sky-500/10 text-sky-400'
						: 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
				"
				:aria-current="page.to === currentPath ? 'page' : undefined"
			>
				<UIcon :name="page.icon" class="shrink-0 text-base opacity-80" />
				{{ page.title }}
			</NuxtLink>
		</div>
	</nav>
</template>
