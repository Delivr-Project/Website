<script setup lang="ts">
import { githubOrgUrl } from "~/data/project";
</script>

<template>
	<section class="relative overflow-hidden py-28">
		<div
			class="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-sky-500/5 to-transparent"
			aria-hidden="true"
		></div>

		<UContainer class="relative z-10">
			<div class="mx-auto max-w-3xl text-center">
				<h2 class="mb-6 text-3xl font-bold text-balance sm:text-4xl lg:text-5xl">
					Ready to take your inbox
					<span class="bg-linear-to-tr from-sky-400 to-sky-200 bg-clip-text text-transparent">back</span>?
				</h2>
				<p class="mb-8 text-lg text-slate-400">
					Open source, self-hostable, and built to play nicely with the email server you already
					have.
				</p>
				<div class="flex flex-col justify-center gap-4 sm:flex-row">
					<UButton to="/docs/self-hosting" size="xl" color="primary" icon="i-lucide-rocket" class="justify-center px-8">
						Deploy Delivr
					</UButton>
					<UButton
						:to="githubOrgUrl"
						target="_blank"
						size="xl"
						color="neutral"
						variant="outline"
						icon="i-lucide-github"
						class="justify-center px-8"
					>
						Star on GitHub
					</UButton>
				</div>
			</div>
		</UContainer>
	</section>
</template>
