<template>
	<div class="flex flex-col gap-y-5">
		<Transition name="fade" mode="out-in">
			<SubredditBanner
				v-if="user"
				type="user"
				:subreddit="user"
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
	const userName = (route.params as RouteParams<"u-profile">).profile;

	useHead({
		title: userName
	});
	definePageMeta({
		layout: "content"
	});

	const { isAuthenticated, order, sort } = useReddit();
	const after = ref<string | undefined>();
	const fetchedPosts = ref<Submission[]>([]);

	const { data: user } = await useLazyFetch("/api/user", {
		query: {
			user: userName
		},
		transform: (infos: RedditResponse<RawUser>) => {
			console.log(infos);
			return infos.data;
		}
	});

	const { data: posts, status, execute: loadFeed } = await useLazyFetch("/api/feed", {
		query: {
			type: "user",
			isAuthenticated,
			order,
			sort,
			after,
			user: userName
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
