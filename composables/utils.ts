export const useUtils = () => {
	const formatNumber = (num: number) => {
		return Intl.NumberFormat("en-US", {
			notation: "compact",
			maximumFractionDigits: 1
		}).format(num);
	};

	const share = async (infos: PostInfos) => {
		try {
			await navigator.share(infos);
		} catch (err) {
			const { copy } = useClipboard();
			copy(infos.url);
		}
	};

	return {
		formatNumber,
		share
	};
};
