<template>
	<div class="grid h-screen place-content-center">
		<a :href="endpoint">Login</a>
	</div>
</template>

<script lang="ts" setup>
	const { redditApiKey } = useRuntimeConfig();
	const { authRedirectUrl } = useConstants();
	const endpoint = `https://www.reddit.com/api/v1/authorize?client_id=${redditApiKey}&response_type=code&state=test&redirect_uri=${authRedirectUrl}&duration=permanent&scope=identity,mysubreddits`;
</script>
