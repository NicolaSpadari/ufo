export const useRedditStore = defineStore("reddit", () => {
	const accessToken = ref("");
	const refreshToken = ref("");
	const user = ref<RedditUser | null>(null);
	const favorites = ref<Subreddit[]>([]);
	const subscriptions = ref<Subreddit[]>([]);
	const multireddits = ref<Multireddit[]>([]);

	return {
		accessToken,
		refreshToken,
		user,
		subscriptions,
		favorites,
		multireddits
	};
}, {
	persist: {
		storage: persistedState.localStorage
	}
});
