<template>
	<dialog ref="dialog">
		<slot />
	</dialog>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		id: string
	}>();

	const dialog = ref<InstanceType<any> | undefined>(null);
	const { isOpen, closeModal } = useModal();

	useEventListener(dialog, "click", (e) => {
		const dialogItem = dialog.value.getBoundingClientRect();

		if (e.clientX < dialogItem.left || e.clientX > dialogItem.right || e.clientY < dialogItem.top || e.clientY > dialogItem.bottom) {
			closeModal(props.id);
		}
	});

	useEventListener(document, "keydown", (e) => {
		if (isOpen.value.get(props.id) && e.key === "Escape") {
			closeModal(props.id);
		}
	});

	watch(() => isOpen.value.get(props.id), (open) => {
		open ? dialog.value.showModal() : dialog.value.close("dismiss");
	});
</script>

<style lang="scss">
	html:has(dialog[open]) {
	@apply overflow-hidden;
}

dialog {
	@apply fixed inset-0 block invisible rounded-lg p-10 shadow-lg ease-in duration-300 opacity-0 transition-opacity;
	&::backdrop {
		@apply backdrop-filter backdrop-blur-5;
	}

	&[open] {
		@apply visible opacity-100;
	}
}
</style>
