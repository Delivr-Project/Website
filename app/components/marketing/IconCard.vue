<script setup lang="ts">
const { icon, title, description } = defineProps<{
	icon: string;
	title: string;
	description: string;
}>();
</script>

<template>
	<UCard
		class="h-full border-slate-800 bg-black transition duration-300 hover:-translate-y-1 hover:border-sky-400/50"
	>
		<div class="space-y-3 p-2">
			<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-500/10">
				<UIcon :name="icon" class="text-xl text-sky-400" />
			</div>
			<h3 class="text-lg font-semibold">{{ title }}</h3>
			<p class="leading-relaxed text-slate-400">{{ description }}</p>
			<slot />
		</div>
	</UCard>
</template>
