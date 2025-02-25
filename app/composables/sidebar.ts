export const useSidebar = () => {
	const open = useState("sidebar", () => false);

	return {
		open
	};
};
