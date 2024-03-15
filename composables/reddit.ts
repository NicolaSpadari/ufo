const client = ref<Snoowrap | null>(null);

export const useReddit = () => {
	const config = useRuntimeConfig();
	const { accessToken, refreshToken, user, subscriptions, favorites } = storeToRefs(useRedditStore());
	const { allScopes, authRedirectUrl, randomString, userAgent } = useConstants();

	const authUrl = reddit.getAuthUrl({
		clientId: config.public.redditApiKey,
		scope: allScopes,
		redirectUri: authRedirectUrl,
		permanent: true,
		state: randomString
	});

	const initializeClient = () => {
		console.log("call init client");
		client.value = new reddit({
			userAgent,
			clientId: config.public.redditApiKey,
			clientSecret: config.public.redditSecretKey,
			refreshToken: refreshToken.value
		});
	};

	const setSubscriptions = () => {
		console.log("call set subscriptions");
		// @ts-expect-error: "then" exists in getSubscriptions() function
		client.value!.getSubscriptions({ limit: 999 }).then((subreddits: Subreddit[]) => {
			favorites.value = subreddits.filter((subreddit) => subreddit.user_has_favorited).sort((a, b) => a.display_name_prefixed.localeCompare(b.display_name_prefixed));
			subscriptions.value = subreddits.filter((subreddit) => !subreddit.user_has_favorited).sort((a, b) => a.display_name_prefixed.localeCompare(b.display_name_prefixed));
		});
	};

	const authorize = (authCode: string) => {
		console.log("call authorize");
		reddit.fromAuthCode({
			code: authCode,
			userAgent,
			clientId: config.public.redditApiKey,
			clientSecret: config.public.redditSecretKey,
			redirectUri: authRedirectUrl
		}).then((res) => {
			accessToken.value = res.accessToken;
			refreshToken.value = res.refreshToken;

			initializeClient();

			console.log("call get me");
			client.value!.getMe().then((me) => {
				user.value = me;

				setSubscriptions();
			});
		});
	};

	const logout = () => {
		user.value = null;
		accessToken.value = "";
		refreshToken.value = "";
		subscriptions.value = [];
		favorites.value = [];
	};

	return {
		authUrl,
		authorize,
		logout,
		client,
		initializeClient,
		setSubscriptions
	};
};
