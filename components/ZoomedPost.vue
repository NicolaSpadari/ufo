<template>
	<div v-if="activePost" h-full>
		<div v-if="activePost.is_gallery" relative>
			<div w-full bg-neutral-700>
				<NuxtImg :src="activePost.media_metadata[state.media_id].p[activePost.media_metadata[state.media_id].p.length - 1].u" max-h="32rem" mx-auto />
			</div>

			<div bg-main absolute absolute-center-h bottom-3 flex items-center gap-2 rounded-full p-2 text-sm text-gray-400 shadow-sm>
				<button type="button" @click="prev()">
					<Icon name="heroicons-solid:chevron-left" size-4 />
				</button>
				<span>{{ curIndex }} / {{ activePost.gallery_data?.items?.length }}</span>
				<button type="button" @click="next()">
					<Icon name="heroicons-solid:chevron-right" size-4 />
				</button>
			</div>
		</div>

		<NuxtImg
			v-if="activePost.post_hint === 'image' || activePost.post_hint === 'link'"
			:src="activePost.is_reddit_media_domain ? activePost.url : previewImage"
			mx-auto h-full object-contain
		/>
	</div>
</template>

<script lang="ts" setup>
	const { activePost } = useReddit();

	const previewImage = activePost.value?.preview?.images[0].resolutions[activePost.value.preview.images[0].resolutions.length - 1].url;
	const { state, index, next, prev } = useCycleList(activePost.value?.gallery_data?.items || []);
	const curIndex = computed(() => index.value + 1);
</script>
