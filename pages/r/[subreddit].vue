<template>
	<div v-if="user">
		<Banner v-if="activeSubreddit" type="subreddit" :subreddit="activeSubreddit" />
		<Feed :posts="posts" type="subreddit" :loading="loading" @more="loadMore()" />

		<Teleport to="body">
			<div v-if="activeSubreddit?.user_is_banned" pointer-events-none fixed inset-x-0 bottom-0 sm="pb-5 px-6" lg="px-8">
				<div flex items-center justify-between gap-x-6 bg-red-600 px-6 py="2.5" sm="rounded-xl py-3 pl-4 pr-3.5">
					<p text-sm text-light leading-6>
						<span font-semibold>Warning:</span> You have been banned from this Subreddit
					</p>

					<Icon name="heroicons-solid:exclamation-triangle" text-light size-4 />
				</div>
			</div>
		</Teleport>
	</div>
</template>

<script lang="ts" setup>
	const route = useRoute();
	const { client, activeSubreddit } = useReddit();
	const { user, order, sort } = storeToRefs(useRedditStore());
	const { appName, batchSize, methodNameMap } = useConstants();
	const posts = ref<Submission[]>([]);
	const loading = ref(true);

	console.log("call subreddit");

	client.value!.getSubreddit((route.params as RouteParams).subreddit).fetch().then((res: Subreddit) => {
		activeSubreddit.value = res;

		useSeoMeta({
			title: `${activeSubreddit.value!.display_name} | ${appName}`
		});
	});

	const loadFeed = () => {
		console.log("call subreddit feed");

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
