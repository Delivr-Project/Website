/**
 * Static docs navigation — consumed by the docs sidebar and prev/next links.
 * Follows the style-guide "static data in app/data/" idiom.
 */

export interface DocsPage {
	/** Absolute page path, also the route. */
	to: string;
	title: string;
	description: string;
	icon: string;
}

export interface DocsSection {
	label: string;
	pages: DocsPage[];
}

export const docsSections: DocsSection[] = [
	{
		label: "Introduction",
		pages: [
			{
				to: "/docs",
				title: "Overview",
				description: "What Delivr is, how it works, and where to go next.",
				icon: "i-lucide-book-open",
			},
			{
				to: "/docs/about",
				title: "How Delivr Works",
				description: "Architecture, request flow, and what is stored where.",
				icon: "i-lucide-workflow",
			},
			{
				to: "/docs/faq",
				title: "FAQ",
				description: "Answers to the most common questions about Delivr.",
				icon: "i-lucide-circle-help",
			},
		],
	},
	{
		label: "Self-Hosting",
		pages: [
			{
				to: "/docs/self-hosting",
				title: "Overview & Requirements",
				description: "Plan your deployment: requirements, topology, domains, and ports.",
				icon: "i-lucide-server",
			},
			{
				to: "/docs/self-hosting/docker",
				title: "Docker Compose",
				description: "Run the API and the web client with the official container images.",
				icon: "i-lucide-container",
			},
			{
				to: "/docs/self-hosting/manual",
				title: "Manual Installation",
				description: "Run Delivr with Bun or the standalone binary and systemd.",
				icon: "i-lucide-terminal",
			},
			{
				to: "/docs/self-hosting/reverse-proxy",
				title: "Reverse Proxy & HTTPS",
				description: "Caddy, Nginx, Traefik, and Apache configurations with TLS.",
				icon: "i-lucide-network",
			},
			{
				to: "/docs/self-hosting/first-run",
				title: "First Run & Admin Setup",
				description: "Claim the admin account, create users, and connect a mailbox.",
				icon: "i-lucide-user-cog",
			},
			{
				to: "/docs/self-hosting/upgrading",
				title: "Updates & Backups",
				description: "Keep Delivr up to date and back up what matters.",
				icon: "i-lucide-refresh-cw",
			},
			{
				to: "/docs/self-hosting/hardening",
				title: "Production Hardening",
				description: "A security checklist for instances exposed to the internet.",
				icon: "i-lucide-shield-check",
			},
			{
				to: "/docs/self-hosting/troubleshooting",
				title: "Troubleshooting",
				description: "Fixes for the most common deployment problems.",
				icon: "i-lucide-life-buoy",
			},
		],
	},
	{
		label: "Configuration",
		pages: [
			{
				to: "/docs/configuration",
				title: "Configuration Reference",
				description: "Every environment variable for Delivr API and Delivr Web.",
				icon: "i-lucide-settings-2",
			},
			{
				to: "/docs/configuration/mail-providers",
				title: "Mail Provider Settings",
				description: "IMAP and SMTP settings for popular providers and mail servers.",
				icon: "i-lucide-mail",
			},
		],
	},
	{
		label: "User Guide",
		pages: [
			{
				to: "/docs/guide/getting-started",
				title: "Getting Started",
				description: "Sign in, connect your first mailbox, and install the app.",
				icon: "i-lucide-rocket",
			},
			{
				to: "/docs/guide/reading-and-organizing",
				title: "Reading & Organizing",
				description: "Views, folders, bulk actions, drag & drop, and search.",
				icon: "i-lucide-inbox",
			},
			{
				to: "/docs/guide/writing",
				title: "Writing Mail",
				description: "The composer, attachments, drafts, identities, and signatures.",
				icon: "i-lucide-pen-line",
			},
			{
				to: "/docs/guide/settings",
				title: "Settings & Privacy",
				description: "Preferences, remote content, account security, and API keys.",
				icon: "i-lucide-sliders-horizontal",
			},
			{
				to: "/docs/guide/administration",
				title: "Administration",
				description: "Manage users and roles on your instance.",
				icon: "i-lucide-shield-user",
			},
		],
	},
	{
		label: "For Developers",
		pages: [
			{
				to: "/docs/api",
				title: "API Overview",
				description: "The Delivr REST API: OpenAPI, auth, API keys, and the generated client.",
				icon: "i-lucide-plug",
			},
			{
				to: "/docs/development",
				title: "Development Setup",
				description: "Run Delivr locally, run the tests, and find your way around the code.",
				icon: "i-lucide-code-xml",
			},
			{
				to: "/docs/contributing",
				title: "Contributing",
				description: "How to report bugs, propose features, and open pull requests.",
				icon: "i-lucide-git-pull-request",
			},
		],
	},
];

/** Flat list of pages in reading order, for prev/next navigation. */
export const docsPagesFlat: DocsPage[] = docsSections.flatMap((section) => section.pages);

export function getDocsPageByPath(path: string): DocsPage | undefined {
	return docsPagesFlat.find((page) => page.to === path);
}
