<template>
	<div v-if="props.post.post_hint === 'rich:video'">
		<div class="video-wrapper" h="42rem" v-html="props.post.secure_media_embed?.content?.replace('position:absolute;', '')" />
	</div>

	<div v-else-if="props.post.post_hint === 'hosted:video'">
		<VuePlyr :options="{ autoplay: true }" max-h="48rem">
			<video controls playsinline>
				<source :src="props.post.secure_media?.reddit_video?.fallback_url">
			</video>
		</VuePlyr>
	</div>

	<div v-else-if="props.post.gallery_data?.items?.length">
		<div relative>
			<div w-full bg-neutral-700>
				<NuxtImg :src="props.post.media_metadata[state.media_id].p[props.post.media_metadata[state.media_id].p.length - 1].u" max-h="32rem" mx-auto />
			</div>

			<div absolute absolute-center-h bottom-3 flex items-center gap-2 rounded-full bg-main p-2 text-sm text-gray-400 shadow-sm>
				<button i-heroicons-solid-chevron-left h-4 w-4 @click="prev()" />
				<span>{{ curIndex }} / {{ props.post.gallery_data?.items?.length }}</span>
				<button i-heroicons-solid-chevron-right h-4 w-4 @click="next()" />
			</div>
		</div>
	</div>

	<div v-else-if="props.post.post_hint === 'image' || props.post.post_hint === 'link'">
		<div w-full bg-neutral-700>
			<NuxtImg v-if="props.post.is_reddit_media_domain" :src="props.post.url" max-h="40rem" mx-auto />
			<NuxtImg v-else :src="previewImage" max-h="40rem" mx-auto />
		</div>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		post: Submission
	}>();

	const previewImage = props.post.preview?.images[0].resolutions[props.post.preview.images[0].resolutions.length - 1].url;
	const { state, index, next, prev } = useCycleList(props.post.gallery_data?.items || []);
	const curIndex = computed(() => index.value + 1);
</script>

<style>
.video-wrapper > iframe {
	@apply w-full h-full;
}
</style>
