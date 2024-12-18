export const useNavbar = () => {
	const height = useState<number | undefined>("height", () => 0);

	onMounted(() => {
		height.value = document.getElementById("navbar")?.clientHeight;
	});

	return {
		height
	};
};
