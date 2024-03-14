<template>
	<Feed :posts="posts" @more="loadMore()" />
</template>

<script lang="ts" setup>
	const { client } = useReddit();
	const posts = ref<Submission[]>([])

	client.value?.getHot(undefined, { limit: 15 }).then(res => posts.value = res);

	const loadMore = () => {
		console.log("todo loadmore")
		// res.fetchMore({
		// 	amount: 10,
		// 	skipReplies: true,
		// 	append: false
		// }).then(newRes => {
		// 	posts.value.push(...newRes)
		// });
	}
</script>