export default defineAppConfig({
	ui: {
		colors: {
			primary: "sky",
			neutral: "slate",
		},
		// Lucide-only icons for code-block filenames (Nuxt UI defaults to vscode-icons).
		prose: {
			codeIcon: {
				".env": "i-lucide-file-key",
				env: "i-lucide-file-key",
				yml: "i-lucide-file-code",
				yaml: "i-lucide-file-code",
				json: "i-lucide-file-json",
				conf: "i-lucide-file-cog",
				service: "i-lucide-file-cog",
				caddyfile: "i-lucide-file-cog",
				crontab: "i-lucide-clock",
			},
		},
	},
	theme: {
		radius: 0.5,
		blackAsPrimary: false,
	},
});
