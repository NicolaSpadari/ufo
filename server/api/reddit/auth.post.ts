export default defineEventHandler(async (event) => {
	const { code, redirectUrl } = await readBody(event);
	const { redditApiKey, redditSecretKey } = useRuntimeConfig();
	const btoa = Buffer.from(`${redditApiKey}:${redditSecretKey}`).toString("base64");

	const res = await $fetch<RedditToken>("https://www.reddit.com/api/v1/access_token", {
		method: "POST",
		body: new URLSearchParams({
			grant_type: "authorization_code",
			code: code!.toString(),
			redirect_uri: redirectUrl!.toString()
		}).toString(),
		headers: {
			Authorization: `Basic ${btoa}`,
			"content-type": "application/x-www-form-urlencoded"
		}
	});

	return res;
});
