export const useRedditStore = defineStore("reddit", () => {
	const accessToken = ref("");
	const refreshToken = ref("");
	const user = ref<RedditUser | null>(null);
	const favorites = ref<Subreddit[]>([]);
	const subscriptions = ref<Subreddit[]>([]);

	return {
		accessToken,
		refreshToken,
		user,
		subscriptions,
		favorites
	};
}, {
	persist: {
		storage: persistedState.localStorage
	}
});
