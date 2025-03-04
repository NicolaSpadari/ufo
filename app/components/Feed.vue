<template>
	<div class="flex flex-col gap-y-5">
		<PostSwitcher />

		<UCard
			variant="outline"
			:ui="{
				body: 'p-1 sm:p-2'
			}"
		>
			<Post v-for="post in props.posts" :key="post.name" :post="post" :from="props.type" />

			<Loader ref="loader" />
		</UCard>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		posts: Submission[]
		type: "feed" | "subreddit"
		loading: boolean
	}>();

	const emit = defineEmits(["loadMore"]);

	const loader = ref<HTMLElement | null>(null);

	useIntersectionObserver(loader, ([entry]) => {
		if (entry?.isIntersecting && !props.loading) {
			emit("loadMore");
		}
	});
</script>
