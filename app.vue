<template>
	<Html min-h-screen scroll-smooth>
		<Body overflow-x-hidden bg-main custom-scrollbar>
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>

			<Modal id="zoomModal">
				<ZoomedPost />
				<button absolute flex flex-center right-3 top-3 rounded-full bg="light/70" p-2 @click="closeModal('zoomModal')">
					<i-heroicons-outline-x-mark w-8 h-8 text-main />
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
