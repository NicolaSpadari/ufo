<template>
	<div v-if="post.post_hint === 'rich:video'">
		<div class="video-wrapper" h="42rem" v-html="post.secure_media_embed?.content?.replace('position:absolute;', '')" />
	</div>

	<div v-else-if="post.post_hint === 'hosted:video'">
		<VuePlyr :options="{ autoplay: true }" max-h="48rem">
			<video controls playsinline>
				<source :src="post.secure_media?.reddit_video?.fallback_url">
			</video>
		</VuePlyr>
	</div>

	<div v-else-if="post.is_gallery">
		<div relative>
			<div w-full bg-neutral-700>
				<NuxtImg :src="post.media_metadata[state.media_id].p[post.media_metadata[state.media_id].p.length - 1].u" max-h="32rem" mx-auto />
			</div>

			<div absolute absolute-center-h bottom-3 flex items-center gap-2 rounded-full bg-main p-2 text-sm text-gray-400 shadow-sm>
				<button i-heroicons-solid-chevron-left h-4 w-4 @click="prev()" />
				<span>{{ curIndex }} / {{ post.gallery_data?.items?.length }}</span>
				<button i-heroicons-solid-chevron-right h-4 w-4 @click="next()" />
			</div>
		</div>
	</div>

	<div v-else-if="post.post_hint === 'image' || post.post_hint === 'link'">
		<div class="group" relative w-full bg-neutral-700>
			<NuxtImg v-if="post.is_reddit_media_domain" :src="post.url" max-h="40rem" mx-auto />
			<NuxtImg v-else :src="previewImage" max-h="40rem" mx-auto />

			<button type="button" absolute bottom-2 right-2 opacity-0 transition-opacity class="group-hover:opacity-100" @click="setActivePost()">
				<i-heroicons-outline-arrows-pointing-out h-6 w-6 text-light />
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		post: Submission
	}>();

	const post = toRef(props.post);
	const { openModal } = useModal();
	const { activePost } = useReddit();

	if (props.post.crosspost_parent && props.post.crosspost_parent !== "") {
		post.value = props.post.crosspost_parent_list[0];
	}

	const previewImage = post.value.preview?.images[0].resolutions[post.value.preview.images[0].resolutions.length - 1].url;
	const { state, index, next, prev } = useCycleList(post.value.gallery_data?.items || []);
	const curIndex = computed(() => index.value + 1);

	const setActivePost = () => {
		console.log("setting", props.post)
		activePost.value = props.post;
		openModal("zoomModal");
	};
</script>

<style>
.video-wrapper > iframe {
	@apply w-full h-full;
}
dialog img {
	@apply max-h-full!;
}
</style>
