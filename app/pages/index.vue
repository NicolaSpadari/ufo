<template>
	<div class="flex flex-col gap-y-5">
		<FeedFilter />

		<Transition name="fade" mode="out-in">
			<FeedContainer
				v-if="posts?.length"
				:posts="posts"
				type="feed"
				:loading="status === 'pending'"
				@load-more="loadMore()"
			/>
		</Transition>

		<PostZoomed />
	</div>
</template>

<script lang="ts" setup>
	useHead({
		title: "Home"
	});

	const { isAuthenticated, order, sort } = useReddit();
	const after = ref<string | undefined>();
	const fetchedPosts = ref<Submission[]>([]);
	const isFirstLoad = ref(true);

	const { data: posts, status, execute: loadFeed } = await useLazyFetch("/api/feed", {
		query: {
			type: "subreddit",
			isAuthenticated,
			order,
			sort,
			after
		},
		transform: (feed: RedditResponse<RawSubmission>) => {
			const newPosts = feed.data.children?.map((child) => child.data) || [];

			if (isFirstLoad.value) {
				fetchedPosts.value = newPosts;
				isFirstLoad.value = false;
			} else {
				fetchedPosts.value.push(...newPosts);
			}

			return fetchedPosts.value;
		}
	});

	watchOnce(isAuthenticated, async () => await loadFeed());

	const loadMore = () => {
		console.log("loadmore");
		after.value = posts.value?.at(-1)?.name;
	};
</script>
