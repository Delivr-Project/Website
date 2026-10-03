<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import DelivrLogo from "~/components/img/DelivrLogo.vue";
import { githubOrgUrl } from "~/data/project";

const route = useRoute();

const links = computed<NavigationMenuItem[]>(() => [
	{
		label: "Features",
		to: "/#features",
		active: route.path === "/" && route.hash === "#features",
	},
	{
		label: "Philosophy",
		to: "/about",
	},
	{
		label: "Security",
		to: "/security",
	},
	{
		label: "Open Source",
		to: "/open-source",
	},
	{
		label: "Roadmap",
		to: "/roadmap",
	},
	{
		label: "Docs",
		to: "/docs",
		active: route.path.startsWith("/docs"),
	},
]);

const socialLinks = [
	{
		icon: "i-lucide-github",
		to: githubOrgUrl,
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
	<!-- UHeader wraps the title slot in its own link to `to`, so the slot holds only the logo. -->
	<UHeader class="backdrop-blur-xl" title="Delivr — Home" to="/">
		<template #title>
			<DelivrLogo class="h-6 w-auto" />
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
			<UButton to="/docs/self-hosting" color="primary" variant="solid" class="font-medium">
				Get Started
			</UButton>
		</template>
	</UHeader>
</template>
