export const useReddit = () => {
	const config = useRuntimeConfig();
	const { accessToken, refreshToken, user, subscriptions, favorites, multireddits } = storeToRefs(useRedditStore());
	const { allScopes, randomString, userAgent } = useConstants();
	const client = useState<Snoowrap | null>("client", () => null);
	const activePost = useState<Submission | null>("activePost", () => null);

	const authUrl = Reddit.getAuthUrl({
		clientId: config.public.redditApiKey,
		scope: allScopes,
		redirectUri: config.public.authRedirectUrl,
		permanent: true,
		state: randomString
	});

	const initializeClient = () => {
		console.log("call init client");
		client.value = new Reddit({
			userAgent,
			clientId: config.public.redditApiKey,
			clientSecret: config.public.redditSecretKey,
			refreshToken: refreshToken.value
		});
	};

	const setSubscriptions = () => {
		console.log("call set subscriptions");
		client.value!.getSubscriptions({ limit: 999 }).then((subreddits: Subreddit[]) => {
			favorites.value = subreddits.filter((subreddit) => subreddit.user_has_favorited).sort((a, b) => a.display_name_prefixed.localeCompare(b.display_name_prefixed));
			subscriptions.value = subreddits.filter((subreddit) => !subreddit.user_has_favorited).sort((a, b) => a.display_name_prefixed.localeCompare(b.display_name_prefixed));
		});
	};

	const setMultireddits = () => {
		console.log("call set multireddits");
		// @ts-expect-error: "then" exists in getMultireddits() function
		client.value!.getUser(user.value.name).getMultireddits().then((multis: MultiReddit[]) => {
			console.log("got", multis);
			multireddits.value = multis;
		});
	};

	const authorize = (authCode: string) => {
		console.log("call authorize");
		Reddit.fromAuthCode({
			code: authCode,
			userAgent,
			clientId: config.public.redditApiKey,
			clientSecret: config.public.redditSecretKey,
			redirectUri: config.public.authRedirectUrl
		}).then((res: any) => {
			accessToken.value = res.accessToken;
			refreshToken.value = res.refreshToken;

			initializeClient();

			console.log("call get me");
			client.value!.getMe().then((me: any) => {
				user.value = me;

				setSubscriptions();
				setMultireddits();
			});
		});
	};

	const logout = () => {
		user.value = null;
		accessToken.value = "";
		refreshToken.value = "";
		subscriptions.value = [];
		favorites.value = [];
		multireddits.value = [];
		navigateTo("/");
	};

	return {
		authUrl,
		authorize,
		logout,
		client,
		initializeClient,
		setSubscriptions,
		setMultireddits,
		activePost
	};
};
