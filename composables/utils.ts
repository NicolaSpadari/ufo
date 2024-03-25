export const useUtils = () => {
	const formatNumber = (num: number) => {
		return Intl.NumberFormat("en-US", {
			notation: "compact",
			maximumFractionDigits: 1
		}).format(num);
	};

	const share = async () => {
		try {
			await navigator.share({
				title: "Post title",
				text: "Post text",
				url: "Post url"
			});
		} catch (err) {

		}
	};

	return {
		formatNumber,
		share
	};
};
