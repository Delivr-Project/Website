<script setup lang="ts">
interface Button {
	to: string;
	icon: string;
	label: string;
	variant?: "solid" | "outline";
	color?: "primary" | "neutral";
	target?: string;
}

const { buttons = [] } = defineProps<{
	buttons?: Button[];
}>();
</script>

<template>
	<div class="not-prose flex flex-col gap-4 sm:flex-row">
		<UButton
			v-for="button in buttons"
			:key="button.label"
			:to="button.to"
			:target="button.target"
			:icon="button.icon"
			:color="button.color ?? 'primary'"
			:variant="button.variant ?? 'solid'"
			class="w-fit"
		>
			{{ button.label }}
		</UButton>
	</div>
</template>