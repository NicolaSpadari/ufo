<template>
	<div class="grid h-screen place-content-center">
		<a :href="endpoint">Login</a>
	</div>
</template>

<script lang="ts" setup>
	const { public: { redditApiKey } } = useRuntimeConfig();
	const { authRedirectUrl, randomString } = useConstants();

	const endpoint = `https://www.reddit.com/api/v1/authorize?client_id=${redditApiKey}&response_type=code&state=${randomString}&redirect_uri=${authRedirectUrl}&duration=permanent&scope=identity,mysubreddits`;
</script>
