/**
 * Project-wide links and repository metadata, shared by the landing page, the
 * open-source page, and the footer.
 */

export const githubOrgUrl = "https://github.com/Delivr-Project";

export interface Repository {
	name: string;
	description: string;
	icon: string;
	to: string;
	stack: string;
}

export const repositories: Repository[] = [
	{
		name: "Delivr Web",
		description: "The installable web client and PWA your users sign in to.",
		icon: "i-lucide-layout-template",
		to: "https://github.com/Delivr-Project/Delivr-Web",
		stack: "Nuxt 4 · Nuxt UI · TypeScript",
	},
	{
		name: "Delivr API",
		description: "The backend that talks IMAP/SMTP, authenticates users, and serves the REST API.",
		icon: "i-lucide-server",
		to: "https://github.com/Delivr-Project/Delivr-API",
		stack: "Bun · Hono · Drizzle ORM",
	},
	{
		name: "Website & Docs",
		description: "This site — the landing pages and the documentation you are reading.",
		icon: "i-lucide-book-open",
		to: "https://github.com/Delivr-Project/Website",
		stack: "Nuxt 4 · Nuxt Content",
	},
];

/** Base URL for "Edit this page" links on docs pages. */
export const docsEditBaseUrl = "https://github.com/Delivr-Project/Website/edit/main/content";

/** Where security issues should be reported privately. */
export const securityAdvisoryUrl =
	"https://github.com/Delivr-Project/Delivr-API/security/advisories/new";
