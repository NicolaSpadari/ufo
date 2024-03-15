<template>
	<div text-light>
		user {{ $route.params.profile }}

		<pre v-if="redditor">
		{{ redditor }}</pre>
	</div>
</template>

<script lang="ts" setup>
	const route = useRoute();
	const { client } = useReddit();

	const redditor = ref<RedditUser | null>(null);

	client.value?.getUser((route.params as RouteParams).profile!).fetch().then((res) => redditor.value = res);
</script>
