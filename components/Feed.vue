<template>
	<div ref="container" col-span-9 overflow-y-scroll>
		<div v-if="props.posts.length" space-y-7>
			<div v-for="post in props.posts" :key="post.name">
				<details>
					<summary>{{ post.title }} ({{ post.subreddit_name_prefixed }})</summary>

					<pre>
						{{ post }}
					</pre>
				</details>

				<p>{{ post.title }}</p>

				<div v-if="post.secure_media?.reddit_video?.fallback_url">
					<VuePlyr :options="{ autoplay: true }">
						<video controls playsinline>
							<source :src="post.secure_media.reddit_video.fallback_url" />
						</video>
					</VuePlyr>
				</div>

				<NuxtImg v-else-if="post.preview?.images" :src="post.preview.images[0].resolutions[post.preview.images[0].resolutions.length-1].url" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		posts: Submission[],
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
