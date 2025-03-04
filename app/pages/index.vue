<template>
	<div mt-3>
		<Feed
			v-if="isAuthenticated"
			:posts="posts"
			type="feed"
			:loading="status === 'pending'"
			@load-more="loadMore()"
		/>

		<pre v-if="error">{{ error }}</pre>
	</div>
</template>

<script lang="ts" setup>
	const { isAuthenticated, order, sort } = useReddit();
	const after = ref<string | undefined>();

	const { data: posts, error, status, execute: loadFeed } = await useFetch<RedditResponse<RawSubreddit>>("/api/feed", {
		immediate: false,
		query: {
			order,
			sort,
			after: after.value
		},
		transform: (data) => {
			console.log(data);
			return data.data.children.map((child) => child.data);
		}
	});

	onMounted(async () => {
		if (isAuthenticated?.value) await loadFeed();
	});

	watchOnce(isAuthenticated, async (val) => {
		if (val) await loadFeed();
	});

	const loadMore = () => {
		console.log("loadmore");
		after.value = posts.value[posts.value.length - 1].name;
		console.log("after", after.value);
	};
</script>
