<template>
	<div mt-3>
		<Feed v-if="user" :posts="posts" type="feed" :loading="loading" @more="loadMore()" />
	</div>
</template>

<script lang="ts" setup>
	const route = useRoute();
	const { client } = useReddit();
	const { multiredditBatchSize, methodNameMap } = useConstants();
	const { user, multireddits, order, sort } = storeToRefs(useRedditStore());
	const posts = ref<Submission[]>([]);
	const loading = ref(true);

	const loadFeed = async () => {
		console.log("call multireddit feed");

		const currentMultireddit = multireddits.value.find((mr) => mr.name === (route.params as RouteParams).name);
		const subredditList = currentMultireddit?.subreddits.map((subreddit) => subreddit.display_name);

		const methodName = methodNameMap[order.value];

		if (subredditList) {
			try {
				loading.value = true;

				const fetchPromises = subredditList.map((subredditName) => {
					const methodArgs = (order.value === "top")
						? [subredditName, { time: sort.value, limit: multiredditBatchSize }]
						: [subredditName, { limit: multiredditBatchSize }];

					return client.value[methodName](...methodArgs);
				});

				const results = await Promise.all(fetchPromises);
				const orderedPosts = results.flat();

				for (let i = orderedPosts.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[orderedPosts[i], orderedPosts[j]] = [orderedPosts[j], orderedPosts[i]];
				}

				posts.value.push(...orderedPosts);
			} catch (error) {
				console.error("Error fetching posts:", error);
			} finally {
				loading.value = false;
			}
		} else {
			loading.value = false;
		}
	};

	if (user.value) loadFeed();

	watch([order, sort], () => loadFeed());

	const loadMore = () => {
		console.log("loadmore");
	};
</script>
