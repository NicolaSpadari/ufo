export const useReddit = () => {
	const { public: { redditClientId, authRedirectUrl } } = useRuntimeConfig();
	const { randomString, allScopes } = useConstants();
	const { isEmpty } = useUtils();

	const user = useSessionStorage<RedditUser | object>("user", {});
	const favorites = useSessionStorage<Subreddit[]>("favorites", []);
	const following = useSessionStorage<Subreddit[]>("following", []);
	const subscriptions = useSessionStorage<Subreddit[]>("subscriptions", []);
	const multireddits = useSessionStorage<Multireddit[]>("multireddits", []);
	const order = useState<PostOrder>("order", () => "hot");
	const sort = useState<PostSort>("sort", () => "day");
	const activePost = useState<Submission | null>("activePost", () => null);
	const activeSubreddit = useState<Subreddit | null>("activeSubreddit", () => null);
	const authUrl = computed(() => {
		const url = new URL("https://www.reddit.com/api/v1/authorize");
		url.searchParams.append("client_id", redditClientId);
		url.searchParams.append("response_type", "code");
		url.searchParams.append("state", randomString);
		url.searchParams.append("redirect_uri", authRedirectUrl);
		url.searchParams.append("duration", "permanent");
		url.searchParams.append("scope", allScopes.join(" "));

		return url.toString();
	});
	const isAuthenticated = computed(() => {
		const userValue = user.value || {};
		const userExists = isEmpty(userValue);
		return userExists && useCookie("ufo_access_token").value !== undefined;
	});

	const setUser = async (bearerToken: string) => {
		const { data: profile } = await useFetch<RedditUser>("/api/me", {
			query: {
				bearerToken
			}
		});

		user.value = profile.value;
		console.log("user set");
	};

	const setSubscriptions = async (bearerToken: string) => {
		console.log("call set subscriptions");

		const data = await $fetch<Subscriptions>("/api/subreddits", {
			query: {
				bearerToken,
				limit: 999
			}
		});

		favorites.value = data.favorites;
		subscriptions.value = data.subscriptions;
		following.value = data.following;

		console.log("set subscriptions done");
	};

	const setMultireddits = () => {
		console.log("call set multireddits");

		// client.value!.getUser(user.value.name).getMultireddits().then((multis: MultiReddit[]) => {
		// 	console.log("got", multis);
		// 	multireddits.value = multis;
		// });

		console.log("set multireddits done");
	};

	const authorize = async (bearerToken?: string) => {
		console.log("call authorize");

		if (!bearerToken) return { success: false };

		await setUser(bearerToken);
		await setSubscriptions(bearerToken);
		// await setMultireddits(bearerToken);

		console.log("authorized done");

		return {
			success: true
		};
	};

	const logout = async () => {
		const response = await $fetch("/api/auth/logout");

		if (!response.success) return;

		user.value = null;
		subscriptions.value = [];
		following.value = [];
		favorites.value = [];
		multireddits.value = [];
		navigateTo("/");
	};

	return {
		authUrl,
		authorize,
		logout,
		subscriptions,
		favorites,
		following,
		multireddits,
		setSubscriptions,
		setMultireddits,
		activePost,
		activeSubreddit,
		order,
		sort,
		user,
		isAuthenticated,
		setUser
	};
};
