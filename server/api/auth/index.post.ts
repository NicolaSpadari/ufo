import { Buffer } from "node:buffer";

export default defineEventHandler(async (event) => {
	const { code } = await readBody(event);
	const { public: { authRedirectUrl, redditClientId }, redditSecretKey } = useRuntimeConfig();

	const auth = Buffer.from(`${redditClientId}:${redditSecretKey}`).toString("base64");

	const params = new URLSearchParams({
		grant_type: "authorization_code",
		code,
		redirect_uri: authRedirectUrl
	});

	const authorization = await api<AuthResponse>("/access_token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${auth}`
		},
		body: params.toString()
	});

	return authorization;
});
