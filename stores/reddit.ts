export const useRedditStore = defineStore("reddit", () => {
	const accessToken = ref("");
	const refreshToken = ref("");
	const user = ref<RedditUser | null>(null);
	const favorites = ref<Subreddit[]>([]);
	const subscriptions = ref<Subreddit[]>([]);
	const multireddits = ref<MultiReddit[]>([]);
	const order = ref<PostOrder>("hot");
	const sort = ref<PostSort>("day");

	return {
		accessToken,
		refreshToken,
		user,
		subscriptions,
		favorites,
		multireddits,
		order,
		sort
	};
}, {
	persist: {
		storage: persistedState.localStorage
	}
});
