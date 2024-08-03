<template>
	<Html min-h-screen scroll-smooth antialiased>
		<Body overflow-x-hidden>
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>

			<Modal id="zoomModal">
				<ZoomedPost />
				<button bg="light/70" absolute right-3 top-3 flex flex-center rounded-full p-2 @click="closeModal('zoomModal')">
					<Icon name="heroicons-outline:x-mark" size-8 text-main />
				</button>
			</Modal>
		</Body>
	</Html>
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
	}
	img {
		-webkit-user-drag: none;
		@apply select-none;
	}

	[data-radix-popper-content-wrapper]{
		@apply z-12;
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
