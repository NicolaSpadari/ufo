<template>
	<Feed v-if="user" :posts="posts" :loading="loading" @more="loadMore()" />
</template>

<script lang="ts" setup>
	const route = useRoute();
	const { client } = useReddit();
	const { user } = storeToRefs(useRedditStore());
	const { batchSize } = useConstants();
	const posts = ref<Submission[]>([]);
	const loading = ref(true);

	if(user.value){
		console.log("call subreddit posts")

		client.value!.getNew((route.params as RouteParams).subreddit, { limit: batchSize }).then(res => {
			posts.value = res;
			loading.value = false;
			// console.log("subreddit posts", posts.value)
		});
	}

	const loadMore = () => {
		loading.value = true;
		console.log("call loadmore")

		client.value?.getNew((route.params as RouteParams).subreddit, { limit: batchSize, after: posts.value[posts.value.length-1].name }).then(res => {
			posts.value.push(...res);
			loading.value = false;
		});
	}
</script>
