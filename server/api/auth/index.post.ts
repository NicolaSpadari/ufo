import { Buffer } from "node:buffer";

export default defineEventHandler(async (event) => {
	const { code } = await readBody(event);
	const { authRedirectUrl, redditClientId, redditSecretKey } = useRuntimeConfig();

	const auth = Buffer.from(`${redditClientId}:${redditSecretKey}`).toString("base64");

	const params = new URLSearchParams();
	params.append("grant_type", "authorization_code");
	params.append("code", code);
	params.append("redirect_uri", authRedirectUrl);

	const response = await redditFetch("/access_token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${auth}`
		},
		body: params.toString()
	});

	return response;
});
