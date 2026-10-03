<script setup lang="ts">
const route = useRoute();

const slug = computed(() => {
	const param = route.params.slug;
	return Array.isArray(param) ? param.join("/") : (param ?? "");
});

const { data: page } = await useAsyncData(route.path, () =>
	queryCollection("docs")
		.path(slug.value ? `/docs/${slug.value}` : "/docs")
		.first(),
);

if (!page.value) {
	throw createError({
		statusCode: 404,
		statusMessage: "Page not found",
		fatal: true,
	});
}

usePageSeo({
	title: `${page.value.title} — Delivr Docs`,
	description: page.value.description,
	canonical: `https://www.delivr.email${route.path}`,
});
</script>

<template>
	<DocsPage :toc="page?.body?.toc?.links ?? []" :source-path="page?.stem">
		<ContentRenderer
			v-if="page"
			:value="page"
			class="prose prose-invert max-w-none"
		/>
	</DocsPage>
</template>
