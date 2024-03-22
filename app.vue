<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>

	<Modal id="zoomModal">
		<ZoomedPost />
		<button @click="closeModal('zoomModal')">
			close modal
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
