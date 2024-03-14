import snoowrap from "snoowrap";

export const useSnoowrap = () => {
	const config = useRuntimeConfig();
	const { allScopes, authRedirectUrl, randomString, userAgent } = useConstants();	

	const authUrl = snoowrap.getAuthUrl({
		clientId: config.public.redditApiKey,
		scope: allScopes,
		redirectUri: authRedirectUrl,
		permanent: true,
		state: randomString
	});

	const getCredentials = (authCode: string) => {
		snoowrap.fromAuthCode({
			code: authCode,
			userAgent,
			clientId: config.public.redditApiKey,
			clientSecret: config.public.redditSecretKey,
			redirectUri: authRedirectUrl
		}).then(res => console.log("res is", res));
	}
	
	return {
		authUrl,
		getCredentials
	}
}