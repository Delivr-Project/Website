// Delivr Website & Docs — static site (nuxt generate). Nuxt 4 (app/ srcDir is the default).
export default defineNuxtConfig({
	compatibilityDate: "2026-09-01",
	devtools: { enabled: true },
	modules: ["@nuxt/ui"],

	app: {
		head: {
			htmlAttrs: {
				lang: "en-US",
				class: "dark",
			},
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			meta: [
				{ name: "author", content: "Delivr Project" },
				{ name: "robots", content: "index, follow, max-image-preview:large" },
				{ name: "theme-color", content: "#000000" },
				{
					name: "keywords",
					content: "Delivr, Email, Mail Client, Open Source, Self-Hosted, IMAP, SMTP, PWA, Webmail",
				},
			],
			link: [
				{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
				{ rel: "canonical", href: "https://www.delivr.email" },
			],
			script: [
				{
					type: "application/ld+json",
					innerHTML: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "SoftwareApplication",
						name: "Delivr",
						applicationCategory: "CommunicationApplication",
						operatingSystem: "Web, Self-hosted",
						description:
							"Delivr is a next-generation open-source email client for personal and professional team use, compatible with any email server via IMAP and SMTP.",
						url: "https://www.delivr.email",
						offers: {
							"@type": "Offer",
							price: "0",
							priceCurrency: "USD",
						},
						author: {
							"@type": "Organization",
							name: "Delivr Project",
							url: "https://www.delivr.email",
						},
					}),
				},
			],
		},
	},

	colorMode: {
		preference: "dark",
		fallback: "dark",
		classSuffix: "",
	},

	ssr: true,

	css: ["~/assets/css/main.css"],

	nitro: {
		preset: "static",
		prerender: {
			crawlLinks: true,
			routes: ["/"],
		},
	},

	telemetry: false,
});
