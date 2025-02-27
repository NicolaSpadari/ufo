<template>
	<div>
		<ProseH1>Test</ProseH1>

		<UButton :to="authUrl">
			auth
		</UButton>
	</div>
</template>

<script lang="ts" setup>
	const { public: { redditApiKey, authRedirectUrl } } = useRuntimeConfig();
	const { randomString, allScopes } = useConstants();

	const authUrl = ref("");

	const buildAuthUrl = () => {
		const url = new URL("https://www.reddit.com/api/v1/authorize");

		url.searchParams.append("client_id", redditApiKey);
		url.searchParams.append("response_type", "code");
		url.searchParams.append("state", randomString);
		url.searchParams.append("redirect_uri", authRedirectUrl);
		url.searchParams.append("duration", "permanent");
		url.searchParams.append("scope", allScopes.join(" "));

		authUrl.value = url.toString();
	};

	buildAuthUrl();
</script>
