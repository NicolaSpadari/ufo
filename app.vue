<template>
	<Html min-h-screen scroll-smooth bg-zinc-900 antialiased>
		<Body overflow-x-hidden>
			<DialogRoot>
				<NuxtLayout>
					<NuxtPage />
				</NuxtLayout>

				<Modal>
					<ZoomedPost />
				</Modal>
			</DialogRoot>
		</Body>
	</Html>
</template>

<script lang="ts" setup>
	const { initializeClient } = useReddit();
	const { user } = storeToRefs(useRedditStore());

	if (user.value) initializeClient();
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
		@apply z-13!;
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
