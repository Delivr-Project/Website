<script setup lang="ts">
import Footer from "~/components/layout/Footer.vue";
import Header from "~/components/layout/Header.vue";
</script>

<template>
	<div class="app-layout main-bg-color">
		<Header />

		<UMain class="main-content">
			<slot />
		</UMain>

		<Footer />
	</div>
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