<script setup lang="ts">
import type { FooterColumn } from "@nuxt/ui";
import DelivrLogo from "~/components/img/DelivrLogo.vue";

const socialLinks = [
	{
		icon: "i-lucide-github",
		to: "https://github.com/Delivr-Project",
		label: "GitHub",
	},
];

const resourceLinks = [
	{ label: "Documentation", to: "/docs", target: undefined },
	{ label: "Self-Hosting Guide", to: "/docs/self-hosting", target: undefined },
	{ label: "API Overview", to: "/docs/api", target: undefined },
];

const projectLinks = [
	{ label: "Delivr Web", to: "https://github.com/Delivr-Project/Delivr-Web", target: "_blank" },
	{ label: "Delivr API", to: "https://github.com/Delivr-Project/Delivr-API", target: "_blank" },
];

const legalLinks = [
	{ label: "Impressum", to: "https://legal.leicraftmc.de/impressum/", target: "_blank" },
	{ label: "Datenschutz", to: "https://legal.leicraftmc.de/datenschutz/", target: "_blank" },
];

const footerColumns: FooterColumn[] = [
	{ label: "Resources", children: resourceLinks },
	{ label: "Project", children: projectLinks },
	{ label: "Legal", children: legalLinks },
];

const currentYear = new Date().getFullYear();
</script>

<template>
	<USeparator></USeparator>
	<UFooter
		:ui="{
			root: 'py-12',
			container: 'py-0 lg:py-0 lg:gap-x-0 gap-x-0 lg:block',
			bottom: 'p-0 lg:p-0 mt-8',
		}"
	>
		<UFooterColumns
			:columns="footerColumns"
			:ui="{
				root: 'grid gap-8 sm:grid-cols-2 xl:grid-cols-2 w-full',
				center: 'xl:col-span-1 grid',
				label: 'text-slate-100 font-semibold text-base',
				link: 'text-slate-400 hover:text-sky-400 text-sm sm:text-base inline-block py-1 transition-colors',
				left: 'mb-0',
			}"
		>
			<template #left>
				<div class="space-y-4">
					<DelivrLogo class="h-5 w-auto" />
					<p class="text-slate-300/80 text-base leading-relaxed md:max-w-3xl">
						A mail client that actually Delivers — a next-generation, open-source email client for
						personal and professional team use, compatible with any email server.
					</p>
					<div class="flex gap-2 pt-2">
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
							class="transition-transform hover:scale-110 hover:text-sky-400"
						/>
					</div>
				</div>
			</template>
		</UFooterColumns>

		<template #bottom>
			<UContainer>
				<div
					class="border-t border-slate-800 pt-8 flex flex-col items-center text-center md:flex-row md:justify-between md:text-left"
				>
					<p class="text-slate-500 text-xs sm:text-sm">
						© {{ currentYear }} Delivr Project. Open Source under AGPL-3.0 License.
					</p>
					<p class="text-slate-500 text-xs sm:text-sm">Built with 💙 for the community</p>
				</div>
			</UContainer>
		</template>
	</UFooter>
</template>