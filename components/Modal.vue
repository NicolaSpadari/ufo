<template>
	<dialog ref="dialog" w-screen h-screen overflow-hidden>
		<slot />
	</dialog>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		id: string
	}>();

	const dialog = ref<InstanceType<any> | undefined>(null);
	const { open, closeModal } = useModal();

	useEventListener(dialog, "click", (e) => {
		const dialogItem = dialog.value.getBoundingClientRect();

		if (e.clientX < dialogItem.left || e.clientX > dialogItem.right || e.clientY < dialogItem.top || e.clientY > dialogItem.bottom) {
			closeModal(props.id);
		}
	});

	useEventListener(document, "keydown", (e) => {
		if (open.value.get(props.id) && e.key === "Escape") {
			closeModal(props.id);
		}
	});

	watch(() => open.value.get(props.id), (isOpen) => {
		isOpen ? dialog.value.showModal() : dialog.value.close("dismiss");
	});
</script>

<style lang="scss">
	html:has(dialog[open]) {
	@apply overflow-hidden;
}

dialog {
	@apply fixed inset-0 block invisible rounded-lg ease-in duration-300 opacity-0 transition-opacity;
	&::backdrop {
		@apply backdrop-filter backdrop-blur-5;
	}

	&[open] {
		@apply visible opacity-100;
	}
}
</style>
