<template>
	<div mt-3>
		<Feed v-if="user" :posts="posts" type="feed" :loading="loading" @more="loadMore()" />
	</div>
</template>

<script lang="ts" setup>
	const { client } = useReddit();
	const { user, order, sort } = storeToRefs(useRedditStore());
	const { batchSize } = useConstants();
	const posts = ref<Submission[]>([]);
	const loading = ref(true);

	const loadFeed = () => {
		console.log(`get feed by ${order.value} of ${sort.value}`);

		switch (order.value) {
		case "hot":
			client.value?.getHot(undefined, { limit: batchSize }).then((res: Submission[]) => {
				posts.value = res;
				loading.value = false;
			});
			break;
		case "new":
			client.value?.getNew(undefined, { limit: batchSize }).then((res: Submission[]) => {
				posts.value = res;
				loading.value = false;
			});
			break;
		case "top":
			client.value?.getTop({ time: sort.value, limit: batchSize }).then((res: Submission[]) => {
				posts.value = res;
				loading.value = false;
			});
			break;
		case "rising":
			client.value?.getRising(undefined, { limit: batchSize }).then((res: Submission[]) => {
				posts.value = res;
				loading.value = false;
			});
			break;
		case "controversial":
			client.value?.getControversial(undefined, { limit: batchSize }).then((res: Submission[]) => {
				posts.value = res;
				loading.value = false;
			});
			break;
		}
	};

	if (user.value) loadFeed();

	watchOnce(user, (val) => {
		if (val) loadFeed();
	});

	watch(order, () => {
		loadFeed();
	});

	watch(sort, () => {
		loadFeed();
	});

	const loadMore = () => {
		loading.value = true;

		switch (order.value) {
		case "hot":
			client.value?.getHot(undefined, {
				limit: batchSize,
				after: posts.value[posts.value.length - 1].name
			}).then((res: Submission[]) => {
				posts.value.push(...res);
				loading.value = false;
			});
			break;
		case "new":
			client.value?.getNew(undefined, {
				limit: batchSize,
				after: posts.value[posts.value.length - 1].name
			}).then((res: Submission[]) => {
				posts.value.push(...res);
				loading.value = false;
			});
			break;
		case "top":
			client.value?.getTop({ time: sort.value }, {
				limit: batchSize,
				after: posts.value[posts.value.length - 1].name
			}).then((res: Submission[]) => {
				posts.value.push(...res);
				loading.value = false;
			});
			break;
		case "rising":
			client.value?.getRising(undefined, {
				limit: batchSize,
				after: posts.value[posts.value.length - 1].name
			}).then((res: Submission[]) => {
				posts.value.push(...res);
				loading.value = false;
			});
			break;
		case "controversial":
			client.value?.getControversial(undefined, {
				limit: batchSize,
				after: posts.value[posts.value.length - 1].name
			}).then((res: Submission[]) => {
				posts.value.push(...res);
				loading.value = false;
			});
			break;
		}
	};
</script>

<style>
	body{
		@apply bg-white!;
	}
</style>
