export const useReddit = () => {
	const feed = useState("feed", () => []);

	const getFeed = async () => {
		const { data } = await useFetch("/api/reddit/feed");

		feed.value = data;
	};

	return {
		feed,
		getFeed
	};
};
