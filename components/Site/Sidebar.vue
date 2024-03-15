<template>
	<ul v-if="subscriptions.length" space-y-3 max-h-screen overflow-y-scroll>
		<li v-for="subreddit in subscriptions" :key="subreddit.name">
			<NuxtLink :to="`/${subreddit.display_name_prefixed.toLowerCase()}`">
				{{ subreddit.display_name_prefixed }}
			</NuxtLink>
		</li>
	</ul>
</template>

<script lang="ts" setup>
	const { subscriptions } = storeToRefs(useRedditStore());

	// console.log("subscriptions", subscriptions.value)
</script>
