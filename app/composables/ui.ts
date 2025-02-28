export const useUI = () => {
	const sidebarOpen = useState("sidebarOpen", () => false);

	return {
		sidebarOpen
	};
};
