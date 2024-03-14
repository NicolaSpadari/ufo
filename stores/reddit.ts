export const useRedditStore = defineStore("reddit", () => {
	const accessToken = ref("");
	const refreshToken = ref("");
	const user = ref<RedditUser | null>(null);
	const subscriptions = ref<Subreddit[]>([]);

	return {
		accessToken,
		refreshToken,
		user,
		subscriptions
	}
}, {
	persist: {
		storage: persistedState.localStorage
	}
})