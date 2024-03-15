<template>
	<div col-span-9 p-6>
		<Post />
	</div>
	<!-- <Feed v-if="user" :posts="posts" :loading="loading" @more="loadMore()" /> -->
</template>

<script lang="ts" setup>
	// const { client } = useReddit();
	// const { user } = storeToRefs(useRedditStore());
	// const { batchSize } = useConstants();
	// const posts = ref<Submission[]>([]);
	// const loading = ref(true);

	// const loadFeed = () => {
	// 	console.log("call gethot");
	// 	client.value?.getHot(undefined, { limit: batchSize }).then((res) => {
	// 		posts.value = res;
	// 		loading.value = false;
	// 	});
	// };

	// if (user.value) {
	// 	loadFeed();
	// }

	// const loadMore = () => {
	// 	loading.value = true;
	// 	console.log("call loadmore");

	// 	client.value?.getHot(undefined, { limit: batchSize, after: posts.value[posts.value.length - 1].name }).then((res) => {
	// 		posts.value.push(...res);
	// 		loading.value = false;
	// 	});
	// };
</script>
