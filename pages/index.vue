<template>
    <div class="grid place-content-center h-screen">
        <a :href="endpoint">Login</a>
    </div>
</template>

<script lang="ts" setup>
    const { redditApiKey } = useRuntimeConfig();
    const redirect = "http://localhost:3000/auth";
    const endpoint = `https://www.reddit.com/api/v1/authorize?client_id=${redditApiKey}&response_type=code&state=test&redirect_uri=${redirect}&duration=permanent&scope=identity,mysubreddits`;
</script>
