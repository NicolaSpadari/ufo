<template>
	<div class="flex flex-col gap-y-5">
		<Transition name="fade" mode="out-in">
			<SubredditBanner
				v-if="subreddit"
				type="subreddit"
				:subreddit="subreddit"
			/>
		</Transition>

		<FeedFilter />

		<Transition name="fade" mode="out-in">
			<FeedContainer
				v-if="posts?.length"
				:posts="posts"
				type="subreddit"
				:loading="status === 'pending'"
				@load-more="loadMore()"
			/>
		</Transition>

		<PostZoomed />
	</div>
</template>

<script lang="ts" setup>
	const route = useRoute();
	const subredditName = (route.params as RouteParams<"r-subreddit">).subreddit;

	useHead({
		title: subredditName
	});
	definePageMeta({
		layout: "content"
	});

	const { isAuthenticated, order, sort } = useReddit();
	const after = ref<string | undefined>();
	const fetchedPosts = ref<Submission[]>([]);

	const { data: subreddit } = await useLazyFetch("/api/subreddit", {
		query: {
			subreddit: subredditName
		},
		transform: (infos: RedditResponse<RawSubreddit>) => {
			return infos.data;
		}
	});

	const { data: posts, status, execute: loadFeed } = await useLazyFetch("/api/feed", {
		query: {
			isAuthenticated,
			order,
			sort,
			after,
			subreddit: `r/${subredditName}`
		},
		transform: (feed: RedditResponse<RawSubmission>) => {
			const newPosts = feed.data.children?.map((child) => child.data) || [];
			fetchedPosts.value.push(...newPosts);
			return fetchedPosts.value;
		}
	});

	watchOnce(isAuthenticated, async () => await loadFeed());

	const loadMore = () => {
		console.log("loadmore");
		after.value = posts.value?.at(-1)?.name;
	};
</script>
