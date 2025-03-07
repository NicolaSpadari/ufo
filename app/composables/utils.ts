export const useUtils = () => {
	const socialNetworks = [
		{
			name: "facebook",
			label: "Facebook",
			icon: "simple-icons:facebook"
		},
		{
			name: "threads",
			label: "Threads",
			icon: "simple-icons:threads"
		},
		{
			name: "x",
			label: "X",
			icon: "simple-icons:x"
		},
		{
			name: "linkedin",
			label: "LinkedIn",
			icon: "simple-icons:linkedin"
		},
		{
			name: "bluesky",
			label: "Bluesky",
			icon: "simple-icons:bluesky"
		},
		{
			name: "whatsapp",
			label: "WhatsApp",
			icon: "simple-icons:whatsapp"
		},
		{
			name: "telegram",
			label: "Telegram",
			icon: "simple-icons:telegram"
		},
		{
			name: "email",
			label: "Email",
			icon: "lucide:mail"
		}
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
		if (entry?.icon_img !== "") return entry?.icon_img;
		if (entry?.community_icon !== "") return entry?.community_icon;
		return "";
	};

	const isEmpty = (obj: object) => {
		return (typeof obj === "object" && obj !== null) && Object.keys(obj).length > 0;
	};

	const stripParams = (url?: string) => {
		if (!url) return "";
		return url.split("?")[0];
	};

	const getTimeAgo = (timestamp: number) => {
		return useFormatDistance(useFromUnixTime(timestamp), new Date(), {
			addSuffix: true
		}).replace("about", "");
	};

	return {
		formatNumber,
		getInitials,
		getIcon,
		socialNetworks,
		isEmpty,
		stripParams,
		getTimeAgo
	};
};
