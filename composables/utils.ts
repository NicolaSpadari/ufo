export const useUtils = () => {
	const formatNumber = (num: number) => {
		return Intl.NumberFormat("en-US", {
			notation: "compact",
			maximumFractionDigits: 1
		}).format(num);
	};

	const getInitials = (name: string) => {
		return name.split(" ").map((n) => n[0]).join(".").toUpperCase();
	};

	const share = async (infos: PostInfos) => {
		try {
			await navigator.share(infos);
		} catch (err) {
			console.error(err);
			const { copy } = useClipboard();
			copy(infos.url);
		}
	};

	return {
		formatNumber,
		getInitials,
		share
	};
};
