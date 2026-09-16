<script setup lang="ts">
interface Node {
	icon: string;
	title: string;
	subtitle: string;
}

const nodes: Node[] = [
	{ icon: "i-lucide-smartphone", title: "Delivr Web", subtitle: "Nuxt 4 PWA" },
	{ icon: "i-lucide-server", title: "Delivr API", subtitle: "Bun + Hono" },
	{ icon: "i-lucide-mail", title: "Your Mail Server", subtitle: "Any provider" },
];
</script>

<template>
	<div class="not-prose my-8 rounded-xl border border-slate-800 bg-black p-6">
		<div class="flex flex-col items-center gap-6 sm:flex-row sm:justify-around">
			<template v-for="(node, index) in nodes" :key="node.title">
				<div
					class="w-full max-w-[9rem] rounded-lg border border-slate-700 bg-slate-900/50 p-4 text-center"
				>
					<UIcon :name="node.icon" class="mx-auto mb-2 text-2xl text-sky-400" />
					<div class="font-medium">{{ node.title }}</div>
					<div class="text-xs text-slate-500">{{ node.subtitle }}</div>
				</div>
				<div
					v-if="index < nodes.length - 1"
					class="flex flex-col items-center text-slate-600"
				>
					<UIcon name="i-lucide-arrow-right" class="hidden text-xl sm:block" />
					<UIcon name="i-lucide-arrow-down" class="text-xl sm:hidden" />
					<span class="text-xs">{{ index === 0 ? "HTTPS + JWT" : "IMAP + SMTP" }}</span>
				</div>
			</template>
		</div>
	</div>
</template>