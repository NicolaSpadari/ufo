<template>
	<ul v-if="user && feed">
		<li v-for="(subreddit, sIndex) in feed" :key="sIndex">
			<NuxtLink :to="`/r/${subreddit.data.display_name}`">
				{{ subreddit.data.display_name }}
			</NuxtLink>
		</li>
	</ul>
</template>

<script lang="ts" setup>
	const { user } = useUser();
	const { feed, getFeed } = useReddit();

	if (user.value) {
		await getFeed();
	}
</script>
