export const useUI = () => {
	const sidebarOpen = useState("sidebarOpen", () => false);
	const modalOpen = useState("modalOpen", () => false);
	const activeMedia = useState("activeMedia", () => "");

	return {
		sidebarOpen,
		modalOpen,
		activeMedia
	};
};
