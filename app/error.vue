<script setup lang="ts">
import type { NuxtError } from "#app";
import Footer from "~/components/layout/Footer.vue";
import Header from "~/components/layout/Header.vue";

const props = defineProps<{
	error: NuxtError;
}>();
</script>

<template>
	<NuxtRouteAnnouncer />

	<UApp>
		<div class="app-layout main-bg-color">
			<Header />

			<UMain class="main-content">
				<UContainer class="py-16">
					<UError :error="props.error" />
				</UContainer>
			</UMain>

			<Footer />
		</div>
	</UApp>
</template>

<style scoped>
.app-layout {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

.main-content {
	flex: 1;
}
</style>