<template>
	<div mt-3>
		<Feed v-if="isAuthenticated" :posts="posts" type="feed" :loading="status === 'pending'" @more="loadMore()" />

		<pre v-if="error">{{ error }}</pre>
	</div>
</template>

<script lang="ts" setup>
	const { isAuthenticated, order, sort } = useReddit();
	const after = ref<string | undefined>();

	const { data: posts, error, status, execute: loadFeed } = await useFetch("/api/feed", {
		immediate: false,
		query: {
			order,
			sort,
			after: after.value
		},
		transform: (data) => {
			return data.data.children.map((child) => child.data);
		}
	});

	// const loadFeed = () => {
	// 	console.log("attempt to load home feed");
	// 	const methodName = methodNameMap[order.value];
	// 	const methodArgs = (order.value === "top") ? [{ time: sort.value, limit: batchSize }] : [undefined, { limit: batchSize }];

	// 	client.value?.[methodName](...methodArgs).then((res: Submission[]) => {
	// 		posts.value = res;
	// 		loading.value = false;
	// 	});
	// };

	onMounted(async () => {
		if (isAuthenticated?.value) await loadFeed();
	});

	watchOnce(isAuthenticated, async (val) => {
		if (val) await loadFeed();
	});

	const loadMore = () => {
		console.log("loadmore")
		// loading.value = true;

		// const methodName = methodNameMap[order.value];
		// const methodArgs = (order.value === "top")
		// 	? [{ time: sort.value }, { limit: batchSize, after: posts.value[posts.value.length - 1].name }]
		// 	: [undefined, { limit: batchSize, after: posts.value[posts.value.length - 1].name }];

		// client.value?.[methodName](...methodArgs).then((res: Submission[]) => {
		// 	posts.value.push(...res);
		// 	loading.value = false;
		// });
	};
</script>
