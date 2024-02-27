export const useReddit = () => {
	const feed = useState("feed", () => null);

	const getFeed = async () => {
		const { data: posts } = useNuxtData('subscriptions');
		console.log(posts.value)
		const { data } = await useFetch("/api/reddit/feed", {key: "subscriptions"});
		feed.value = data.value;
	};

	return {
		feed,
		getFeed
	};
};
