<script setup lang="ts">
const { badge, title, description } = defineProps<{
	badge?: string;
	title: string;
	description?: string;
}>();
</script>

<template>
	<header class="mx-auto mb-12 max-w-3xl text-center">
		<UBadge v-if="badge" color="primary" variant="soft" size="xl" class="mb-3">{{ badge }}</UBadge>
		<h2 class="mb-3 text-3xl font-bold text-balance sm:text-4xl lg:text-5xl">
			<slot name="title">{{ title }}</slot>
		</h2>
		<p v-if="description" class="text-lg text-pretty text-slate-400">{{ description }}</p>
	</header>
</template>
