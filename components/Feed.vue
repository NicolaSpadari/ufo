<template>
	<div>
		<PostSwitcher />

		<div py-5 space-y-7>
			<Post v-for="post in props.posts" :key="post.name" :post="post" :from="props.type" />

			<Loader ref="loader" />
		</div>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		posts: Submission[]
		type: "feed" | "subreddit"
		loading: boolean
	}>();

	const emit = defineEmits(["more"]);

	const loader = ref<HTMLElement | null>(null);

	useIntersectionObserver(loader, ([{ isIntersecting }]) => {
		if (isIntersecting && !props.loading) {
			emit("more");
		}
	});
</script>
