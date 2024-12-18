export const useUtils = () => {
	const socialNetworks = [
		"facebook",
		"twitter",
		"linkedin",
		"pinterest",
		"reddit",
		"bluesky",
		"pocket",
		"whatsapp",
		"telegram",
		"skype",
		"line",
		"email"
	];

	const formatNumber = (num: number) => {
		return Intl.NumberFormat("en-US", {
			notation: "compact",
			maximumFractionDigits: 1
		}).format(num);
	};

	const getInitials = (name: string) => {
		return name.split(" ").map((n) => n[0]).join(".").toUpperCase();
	};

	const getIcon = (entry: Subreddit) => {
		if (entry.icon_img !== "") return entry.icon_img;
		if (entry.community_icon !== "") return entry.community_icon;
		return "";
	};

	return {
		formatNumber,
		getInitials,
		getIcon,
		socialNetworks
	};
};
