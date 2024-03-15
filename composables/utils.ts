export const useUtils = () => {
	const formatNumber = (num: number) => {
		return Intl.NumberFormat("en-US", {
			notation: "compact",
			maximumFractionDigits: 1
		}).format(num);
	};

	const share = () => {
		console.log("todo: share");
	};

	return {
		formatNumber,
		share
	};
};
