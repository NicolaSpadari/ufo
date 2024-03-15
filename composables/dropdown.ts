export const useDropdown = (key: string) => {
	const isOpen = useState("dropdownOpen", () => new Map());

	const openDropdown = (id: string) => {
		isOpen.value.set(id, true);
	};
	const closeDropdown = (id: string) => {
		isOpen.value.set(id, false);
	};
	const toggleDropdown = (id: string) => {
		isOpen.value.set(id, !isOpen.value.get(id));
	};
	return {
		key,
		isOpen,
		openDropdown,
		closeDropdown,
		toggleDropdown
	};
};
