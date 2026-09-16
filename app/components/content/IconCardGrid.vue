<script setup lang="ts">
interface Card {
	icon: string;
	title: string;
	description: string;
	to?: string;
	target?: string;
}

const { cards = [] } = defineProps<{
	cards?: Card[];
}>();
</script>

<template>
	<div class="not-prose my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
		<NuxtLink
			v-for="card in cards"
			:key="card.title"
			:to="card.to"
			:target="card.target"
			class="group flex items-start gap-4 rounded-lg border border-slate-800 bg-black p-4 transition hover:border-sky-400/50"
			:class="card.to ? '' : 'pointer-events-none'"
		>
			<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/10">
				<UIcon :name="card.icon" class="text-lg text-sky-400" />
			</div>
			<div>
				<h3
					class="font-semibold"
					:class="card.to ? 'text-slate-200 group-hover:text-sky-400' : 'text-slate-200'"
				>
					{{ card.title }}
				</h3>
				<p class="text-sm text-slate-400">{{ card.description }}</p>
				<NuxtLink
					v-if="card.to && card.target === '_blank'"
					:to="card.to"
					target="_blank"
					class="mt-1 inline-flex items-center gap-1 text-sm text-sky-400 hover:underline"
					@click.stop
				>
					GitHub
					<UIcon name="i-lucide-external-link" class="text-xs" />
				</NuxtLink>
			</div>
		</NuxtLink>
	</div>
</template>