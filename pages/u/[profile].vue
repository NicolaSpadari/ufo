<template>
	<div v-if="user">
		<Banner v-if="redditor" type="user" :redditor="redditor" />
		<Feed :posts="posts" type="feed" :loading="loading" @more="loadMore()" />
	</div>
</template>

<script lang="ts" setup>
	const route = useRoute();
	const { client } = useReddit();
	const { user } = storeToRefs(useRedditStore());
	const { batchSize } = useConstants();
	const posts = ref<Submission[]>([]);
	const redditor = ref<RedditUser | null>(null);
	const loading = ref(true);

	if (user.value) {
		console.log("call user details");

		client.value!.getUser((route.params as RouteParams).profile!).fetch().then((profile) => {
			redditor.value = profile;
			console.log(redditor.value);

			redditor.value.getSubmissions({ limit: batchSize }).then((res) => {
				posts.value = res;
				loading.value = false;
			});
		});
	}

	const loadMore = () => {
		loading.value = true;
		console.log("call loadmore");

		redditor.value!.getSubmissions({ limit: batchSize, after: posts.value[posts.value.length - 1].name }).then((res) => {
			posts.value.push(...res);
			loading.value = false;
		});
	};
</script>
