<template>
	<div>Loading...</div>
</template>

<script lang="ts" setup>
	const access_token = useCookie("access_token");
	const refresh_token = useCookie("refresh_token");

	const { redditApiKey, redditSecretKey } = useRuntimeConfig();
	const { authRedirectUrl } = useConstants();
	const router = useRouter();
	const route = useRoute();
	const code = ref("");

	const params = new URLSearchParams(route.fullPath);
	code.value = params.get("code")!;
	const btoa = Buffer.from(`${redditApiKey}:${redditSecretKey}`).toString("base64");

	const { data } = await useFetch<RedditToken>("https://www.reddit.com/api/v1/access_token", {
		method: "POST",
		body: new URLSearchParams({
			grant_type: "authorization_code",
			code: code.value,
			redirect_uri: authRedirectUrl
		}).toString(),
		headers: {
			Authorization: `Basic ${btoa}`,
			"content-type": "application/x-www-form-urlencoded"
		}
	});

	if (data.value?.access_token) {
		access_token.value = data.value.access_token;
		refresh_token.value = data.value.refresh_token;
		router.push({
			path: "/me"
		});
	}
</script>
