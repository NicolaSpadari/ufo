const client = ref<Snoowrap | null>(null);

export const useReddit = () => {
	const config = useRuntimeConfig();
	const redditStore = useRedditStore();
	const { allScopes, authRedirectUrl, randomString, userAgent } = useConstants();

	const authUrl = reddit.getAuthUrl({
		clientId: config.public.redditApiKey,
		scope: allScopes,
		redirectUri: authRedirectUrl,
		permanent: true,
		state: randomString
	});

	const authorize = (authCode: string) => {
		reddit.fromAuthCode({
			code: authCode,
			userAgent,
			clientId: config.public.redditApiKey,
			clientSecret: config.public.redditSecretKey,
			redirectUri: authRedirectUrl
		}).then(res => {
			redditStore.accessToken = res.accessToken;
			redditStore.refreshToken = res.refreshToken

			initializeClient();

			client.value.getMe().then(user => {
				redditStore.user = user;

				client.value.getSubscriptions({ limit: 999 }).then(subreddits => {
					redditStore.subscriptions = subreddits;
				})
			});
		});
	}

	const initializeClient = () => {
		client.value = new reddit({
			userAgent,
			clientId: config.public.redditApiKey,
			clientSecret: config.public.redditSecretKey,
			refreshToken: redditStore.refreshToken
		});

		console.log("client initialized")
	}

	const logout = () => {
		redditStore.user = null;
		redditStore.accessToken = "";
		redditStore.refreshToken = "";
	}
	
	return {
		authUrl,
		authorize,
		logout,
		client,
		initializeClient
	}
}