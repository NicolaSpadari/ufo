<template>
	<div>
		<p>Sidebar</p>

		<ul v-if="subscriptions.length" m-4 space-y-3>
			<li v-for="subreddit in subscriptions" :key="subreddit.name">
				<NuxtLink :to="`/${subreddit.display_name_prefixed.toLowerCase()}`">
					{{ subreddit.display_name_prefixed }}
				</NuxtLink>
			</li>
		</ul>

		<pre>{{ subscriptions }}</pre>
	</div>
</template>

<script lang="ts" setup>
	const { subscriptions } = storeToRefs(useRedditStore());
</script>
