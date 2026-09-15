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
				title: "About Delivr",
				description: "The next-generation open-source email client — for personal and team use.",
				icon: "i-lucide-info",
			},
		],
	},
	{
		label: "Running Delivr",
		pages: [
			{
				to: "/docs/self-hosting",
				title: "Self-Hosting Guide",
				description: "Set up your own Delivr instance — API, database, and web client.",
				icon: "i-lucide-server",
			},
			{
				to: "/docs/configuration",
				title: "Configuration Reference",
				description: "Every environment variable for Delivr API and Delivr Web.",
				icon: "i-lucide-settings-2",
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
		],
	},
];

/** Flat list of pages in reading order, for prev/next navigation. */
export const docsPagesFlat: DocsPage[] = docsSections.flatMap((section) => section.pages);

export function getDocsPageByPath(path: string): DocsPage | undefined {
	return docsPagesFlat.find((page) => page.to === path);
}