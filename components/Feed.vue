<template>
	<div id="feed" ref="container" scrollbar="~ track-color-transparent thumb-color-neutral-700 rounded">
		<div mr-2 space-y-7>
			<Post v-for="post in props.posts" :post="post" :key="post.name" />
		</div>

		<Loader />
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		posts: Submission[]
		loading: boolean
	}>();

	const emit = defineEmits(["more"]);

	const container = ref<HTMLElement | null>(null);

	useInfiniteScroll(container, () => {
		emit("more");
	}, {
		canLoadMore: () => props.posts.length > 0 && !props.loading
	});
</script>

<style scoped>
#feed {
	height: calc(100vh - 90px);
}
</style>
