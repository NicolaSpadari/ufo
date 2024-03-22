<template>
	<NuxtLayout>
		<NuxtPage />

		<Dev />
	</NuxtLayout>

	<Modal id="zoomModal">
		<ZoomedPost />
		<button absolute flex flex-center right-3 top-3 rounded-full bg="light/70" p-2 @click="closeModal('zoomModal')">
			<i-heroicons-outline-x-mark w-8 h-8 text-main />
		</button>
	</Modal>
</template>

<script lang="ts" setup>
	const { initializeClient } = useReddit();
	const { user } = storeToRefs(useRedditStore());
	const { closeModal } = useModal();

	if (user.value) {
		initializeClient();
	}
</script>

<style lang="scss">
	html {
	-webkit-tap-highlight-color: transparent;
	scroll-behavior: smooth;
	@apply min-h-screen;
}
body {
	@apply overflow-x-hidden bg-main scrollbar scrollbar-track-color-raised scrollbar-thumb-color-neutral-700 scrollbar-rounded;
}
img {
	-webkit-user-drag: none;
	@apply select-none;
}

// Transitions
.fade-enter-active,
.fade-leave-active {
	@apply transition-opacity ease-in-out duration-300;
}
.fade-enter-from,
.fade-leave-to {
	@apply opacity-0;
}
</style>
