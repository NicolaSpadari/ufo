<template>
	<Feed :posts="posts" :loading="loading" @more="loadMore()" />
</template>

<script lang="ts" setup>
	const { client } = useReddit();
	const { batchSize } = useConstants();
	const posts = ref<Submission[]>([])
	const loading = ref(true);

	client.value?.getHot(undefined, { limit: batchSize }).then(res => {
		posts.value = res;
		loading.value = false;
	});

	const loadMore = () => {
		loading.value = true;

		client.value?.getHot(undefined, { limit: batchSize, after: posts.value[posts.value.length-1].name }).then(res => {
			posts.value.push(...res);
			loading.value = false;
		});
	}
</script>