<template>
	<div mt-3>
		<!-- <Feed v-if="isAuthenticated" :posts="posts" type="feed" :loading="loading" @more="loadMore()" /> -->

		<pre v-if="feed">{{ feed }}</pre>
		<pre v-if="error">{{ error }}</pre>
	</div>
</template>

<script lang="ts" setup>
	const { client, isAuthenticated, order, sort } = useReddit();
	// const { batchSize, methodNameMap } = useConstants();
	const posts = ref<Submission[]>([]);
	const loading = ref(true);
	const after = ref<string | undefined>(undefined);

	const { data: feed, error, execute: loadFeed } = await useFetch("/api/feed", {
		immediate: false,
		query: {
			sort: "hot",
			after: after.value
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

	onMounted(() => {
		if (isAuthenticated?.value) loadFeed();
	});

	watchOnce(isAuthenticated, (val) => {
		if (val) loadFeed();
	});

	watch([order, sort], () => {
		loadFeed();
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
