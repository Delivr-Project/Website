<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import DelivrLogo from "~/components/img/DelivrLogo.vue";

const links = computed<NavigationMenuItem[]>(() => [
	{
		label: "Features",
		to: "/#features",
	},
	{
		label: "Self-Hosting",
		to: "/docs/self-hosting",
	},
	{
		label: "Docs",
		to: "/docs",
	},
]);

const socialLinks = [
	{
		icon: "i-lucide-github",
		to: "https://github.com/Delivr-Project",
		label: "GitHub",
	},
];

const mobileLinks = computed<NavigationMenuItem[][]>(() => [
	links.value,
	socialLinks.map((social) => ({
		label: social.label,
		to: social.to,
		target: "_blank",
		icon: social.icon,
	})),
]);
</script>

<template>
	<UHeader class="backdrop-blur-xl">
		<template #title>
			<NuxtLink to="/" class="flex items-center gap-1.5" aria-label="Delivr — Home">
				<DelivrLogo class="h-6 w-auto" />
			</NuxtLink>
		</template>

		<UNavigationMenu :items="[links]" />

		<template #body>
			<UNavigationMenu :items="mobileLinks" orientation="vertical" class="w-full" />
		</template>

		<template #right>
			<div class="hidden lg:flex items-center gap-2">
				<UButton
					v-for="social in socialLinks"
					:key="social.label"
					:to="social.to"
					target="_blank"
					:icon="social.icon"
					color="neutral"
					variant="ghost"
					size="lg"
					:aria-label="social.label"
					class="hover:scale-110 transition-transform duration-200"
				/>
			</div>
			<UButton to="/docs" color="primary" variant="solid" class="font-medium">
				Read the Docs
			</UButton>
		</template>
	</UHeader>
</template>