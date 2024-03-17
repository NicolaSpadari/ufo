<template>
	<div v-if="user">
		<Banner v-if="subreddit" type="subreddit" :subreddit="subreddit" />
		<Feed :posts="posts" type="subreddit" :loading="loading" @more="loadMore()" />
	</div>
</template>

<script lang="ts" setup>
	const route = useRoute();
	const { client } = useReddit();
	const { user } = storeToRefs(useRedditStore());
	const { batchSize } = useConstants();
	const posts = ref<Submission[]>([]);
	const subreddit = ref();
	const loading = ref(true);

	if (user.value) {
		console.log("call subreddit");

		client.value!.getSubreddit((route.params as RouteParams).subreddit).fetch().then((res) => {
			subreddit.value = res;
		});

		client.value!.getNew((route.params as RouteParams).subreddit, { limit: batchSize }).then((res) => {
			posts.value = res;
			loading.value = false;
		});
	}

	const loadMore = () => {
		loading.value = true;
		console.log("call loadmore");

		client.value?.getNew((route.params as RouteParams).subreddit, { limit: batchSize, after: posts.value[posts.value.length - 1].name }).then((res) => {
			posts.value.push(...res);
			loading.value = false;
		});
	};
</script>
