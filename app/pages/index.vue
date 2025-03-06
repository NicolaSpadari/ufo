<template>
	<ClientOnly>
		<Feed
			v-if="isAuthenticated"
			:posts="posts!"
			type="feed"
			:loading="status === 'pending'"
			@load-more="loadMore()"
		/>
	</ClientOnly>
</template>

<script lang="ts" setup>
	const { isAuthenticated, order, sort } = useReddit();
	const after = ref<string | undefined>();

	const { data: posts, status, execute: loadFeed } = await useFetch("/api/feed", {
		immediate: false,
		query: {
			order,
			sort,
			after: after.value
		},
		transform: (feed: RedditResponse<RawSubmission>) => {
			return feed.data.children?.map((child) => child.data) || [];
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
		after.value = posts.value?.[posts.value.length - 1]?.name;
		console.log("after", after.value);
	};
</script>
