const isOpen = ref(new Map());

const useModal = () => {
	const openModal = (id: string) => {
		isOpen.value.set(id, true);
	};

	const closeModal = (id: string) => {
		isOpen.value.set(id, false);
	};

	return {
		isOpen,
		openModal,
		closeModal
	};
};

export { useModal };
export default useModal;
