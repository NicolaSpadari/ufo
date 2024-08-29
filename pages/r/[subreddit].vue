<template>
	<div v-if="user">
		<Banner v-if="subreddit" type="subreddit" :subreddit="subreddit" />
		<Feed :posts="posts" type="subreddit" :loading="loading" @more="loadMore()" />
	</div>
</template>

<script lang="ts" setup>
	const route = useRoute();
	const { client } = useReddit();
	const { user, order, sort } = storeToRefs(useRedditStore());
	const { appName, batchSize, methodNameMap } = useConstants();
	const posts = ref<Submission[]>([]);
	const subreddit = ref<Subreddit | null>(null);
	const loading = ref(true);

	const loadFeed = () => {
		console.log("call subreddit");

		client.value!.getSubreddit((route.params as RouteParams).subreddit).fetch().then((res) => {
			subreddit.value = res;

			useSeoMeta({
				title: `${subreddit.value!.display_name} | ${appName}`
			});
		});

		const methodName = methodNameMap[order.value];
		const methodArgs = (order.value === "top")
			? [(route.params as RouteParams).subreddit, { time: sort.value, limit: batchSize }]
			: [(route.params as RouteParams).subreddit, { limit: batchSize }];

		client.value?.[methodName](...methodArgs).then((res: Submission[]) => {
			posts.value = res;
			loading.value = false;
		});
	};

	if (user.value) loadFeed();

	watch([order, sort], () => loadFeed());

	const loadMore = () => {
		loading.value = true;
		console.log("call loadmore");

		const methodName = methodNameMap[order.value];
		const afterParam = posts.value.length ? posts.value[posts.value.length - 1].name : undefined;
		const methodArgs = (order.value === "top")
			? [(route.params as RouteParams).subreddit, { time: sort.value, limit: batchSize, after: afterParam }]
			: [(route.params as RouteParams).subreddit, { limit: batchSize, after: afterParam }];

		client.value?.[methodName](...methodArgs).then((res: Submission[]) => {
			posts.value.push(...res);
			loading.value = false;
		});
	};
</script>
