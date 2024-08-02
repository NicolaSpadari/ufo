export const useModal = () => {
	const open = useState("modal", () => new Map());

	const openModal = (id: string) => {
		open.value.set(id, true);
	};

	const closeModal = (id: string) => {
		open.value.set(id, false);
	};

	return {
		open,
		openModal,
		closeModal
	};
};
