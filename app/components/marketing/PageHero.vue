<script setup lang="ts">
/** Compact hero for secondary marketing pages (About, Security, Open Source, Roadmap). */
const { badge, badgeIcon, title, description } = defineProps<{
	badge: string;
	badgeIcon: string;
	title: string;
	description: string;
}>();
</script>

<template>
	<section
		class="relative overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(14,165,233,0.14),transparent)] pt-20 pb-16 sm:pt-28 sm:pb-20"
	>
		<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
			<div class="absolute top-1/4 left-1/5 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl"></div>
		</div>

		<UContainer class="relative z-10">
			<div class="mx-auto max-w-3xl text-center">
				<UBadge color="primary" variant="soft" size="xl" class="mb-6 inline-flex items-center gap-1">
					<UIcon :name="badgeIcon" />
					{{ badge }}
				</UBadge>
				<h1 class="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl md:text-6xl">
					<slot name="title">{{ title }}</slot>
				</h1>
				<p class="mx-auto max-w-2xl text-lg leading-[1.6] text-pretty text-slate-400 sm:text-xl">
					{{ description }}
				</p>
				<div v-if="$slots.actions" class="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
					<slot name="actions" />
				</div>
			</div>
		</UContainer>
	</section>
</template>
