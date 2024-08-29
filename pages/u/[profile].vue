<template>
	<div v-if="user">
		<Banner v-if="redditor" type="user" :redditor="redditor" />
		<Feed :posts="posts" type="feed" :loading="loading" @more="loadMore()" />
	</div>
</template>

<script lang="ts" setup>
	const route = useRoute();
	const { client } = useReddit();
	const { user, order, sort } = storeToRefs(useRedditStore());
	const { appName, batchSize } = useConstants();
	const posts = ref<Submission[]>([]);
	const redditor = ref<RedditUser | null>(null);
	const loading = ref(true);

	const loadFeed = () => {
		console.log("load user feed");

		const methodArgs = (order.value === "top")
			? { t: sort.value, sort: order.value, limit: batchSize }
			: { sort: order.value, limit: batchSize };

		redditor.value!.getSubmissions(methodArgs).then((res: Submission[]) => {
			posts.value = res;
			loading.value = false;
		});
	};

	console.log("call user details");

	client.value!.getUser((route.params as RouteParams).profile!).fetch().then((profile: RedditUser) => {
		redditor.value = profile;

		useSeoMeta({
			title: `${redditor.value!.name} | ${appName}`
		});

		loadFeed();
	});

	watch([order, sort], () => loadFeed());

	const loadMore = () => {
		loading.value = true;
		console.log("call loadmore");

		const methodArgs = (order.value === "top")
			? { t: sort.value, sort: order.value, limit: batchSize, after: posts.value[posts.value.length - 1].name }
			: { sort: order.value, limit: batchSize, after: posts.value[posts.value.length - 1].name };

		redditor.value!.getSubmissions(methodArgs).then((res: Submission[]) => {
			posts.value.push(...res);
			loading.value = false;
		});
	};
</script>
