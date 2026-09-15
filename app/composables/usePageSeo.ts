/**
 * usePageSeo — one composable for per-page SEO.
 *
 * Static and marketing sites (Website, Legal-Website, Personal-Website) historically inlined
 * `useSeoMeta` + `useHead` per page, which drifts. This wraps the common case: title/description,
 * a canonical link, optional OpenGraph, and optional JSON-LD. Copy into `app/composables/`.
 *
 * See docs/06-frontend-nuxt.md#static-content-sites.
 */
type JsonLd = Record<string, unknown> & { "@type"?: string };

interface PageSeoOptions {
	title: string;
	description?: string;
	/** Canonical URL path or absolute URL; defaults to the current route. */
	canonical?: string;
	ogTitle?: string;
	ogImage?: string;
	noindex?: boolean;
	/** A JSON-LD block (`Person`, `SoftwareApplication`, `BreadcrumbList`, …). */
	jsonLd?: JsonLd | JsonLd[];
}

export function usePageSeo(options: PageSeoOptions) {
	const route = useRoute();
	const canonical = options.canonical ?? route.path;

	useSeoMeta({
		title: options.title,
		description: options.description,
		ogTitle: options.ogTitle ?? options.title,
		ogDescription: options.description,
		ogImage: options.ogImage,
		robots: options.noindex ? "noindex, nofollow" : "index, follow",
	});

	useHead({
		link: [{ rel: "canonical", href: canonical }],
	});

	if (options.jsonLd) {
		const blocks = Array.isArray(options.jsonLd) ? options.jsonLd : [options.jsonLd];
		useHead({
			script: blocks.map((block) => ({
				type: "application/ld+json",
				innerHTML: JSON.stringify(block),
			})),
		});
	}
}
