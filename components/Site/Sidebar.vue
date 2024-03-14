<template>
	<div>
		<p>Sidebar</p>

		<ul v-if="redditStore.subscriptions.length" m-4 space-y-3>
			<li v-for="subreddit in redditStore.subscriptions" :key="subreddit.name">
				<NuxtLink :to="`/${subreddit.display_name_prefixed.toLowerCase()}`">
					{{ subreddit.display_name_prefixed }}
				</NuxtLink>
			</li>
		</ul>

		<pre>{{ redditStore.subscriptions }}</pre>
	</div>
</template>

<script lang="ts" setup>
	const redditStore = useRedditStore();
</script>
