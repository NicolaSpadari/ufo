<template>
	<UModal
		v-model:open="modalOpen"
		fullscreen
		:ui="{
			content: 'divide-none',
			body: 'flex justify-center'
		}"
		@update:open="handleClose"
	>
		<template #title>
			<VisuallyHidden>Modal title</VisuallyHidden>
		</template>
		<template #description>
			<VisuallyHidden>Modal description</VisuallyHidden>
		</template>
		<template #body>
			<NuxtImg
				ref="zoomedImage"
				:src="activeMedia"
				class="h-full object-contain"
			/>
		</template>
	</UModal>
</template>

<script lang="ts" setup>
	const { modalOpen, activeMedia } = useUI();
	const zoomedImage = ref(null);

	const handleClose = () => {
		modalOpen.value = false;

		setTimeout(() => {
			activeMedia.value = "";
		}, 250);
	};

	onClickOutside(zoomedImage, handleClose);
</script>
