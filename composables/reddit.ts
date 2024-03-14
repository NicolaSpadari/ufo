const client = ref<Snoowrap | null>(null);

export const useReddit = () => {
	const config = useRuntimeConfig();
	const { accessToken, refreshToken, user, subscriptions } = storeToRefs(useRedditStore());
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
			accessToken.value = res.accessToken;
			refreshToken.value = res.refreshToken

			initializeClient();

			client.value!.getMe().then(me => {
				user.value = me;

				// @ts-ignore: "then" exists in getSubscriptions() function
				client.value!.getSubscriptions({ limit: 999 }).then((subreddits: Subreddit[]) => {
					subscriptions.value = subreddits;
				})
			});
		});
	}

	const initializeClient = () => {
		client.value = new reddit({
			userAgent,
			clientId: config.public.redditApiKey,
			clientSecret: config.public.redditSecretKey,
			refreshToken: refreshToken.value
		});
	}

	const logout = () => {
		user.value = null;
		accessToken.value = "";
		refreshToken.value = "";
	}
	
	return {
		authUrl,
		authorize,
		logout,
		client,
		initializeClient
	}
}