<template>
	<div mt-3>
		<Feed v-if="user" :posts="posts" type="feed" :loading="loading" @more="loadMore()" />
	</div>
</template>

<script lang="ts" setup>
	const { client } = useReddit();
	const { user, order, sort } = storeToRefs(useRedditStore());
	const { batchSize, methodNameMap } = useConstants();
	const posts = ref<Submission[]>([]);
	const loading = ref(true);

	const loadFeed = () => {
		const methodName = methodNameMap[order.value];
		const methodArgs = (order.value === "top") ? [{ time: sort.value, limit: batchSize }] : [undefined, { limit: batchSize }];

		client.value?.[methodName](...methodArgs).then((res: Submission[]) => {
			posts.value = res;
			loading.value = false;
		});
	};

	if (user.value) loadFeed();

	watchOnce(user, (val) => {
		if (val) loadFeed();
	});

	watch([order, sort], () => {
		loadFeed();
	});

	const loadMore = () => {
		loading.value = true;

		const methodName = methodNameMap[order.value];
		const methodArgs = (order.value === "top")
			? [{ time: sort.value }, { limit: batchSize, after: posts.value[posts.value.length - 1].name }]
			: [undefined, { limit: batchSize, after: posts.value[posts.value.length - 1].name }];

		client.value?.[methodName](...methodArgs).then((res: Submission[]) => {
			posts.value.push(...res);
			loading.value = false;
		});
	};
</script>

<style>
	body{
		@apply bg-white!;
	}
</style>
