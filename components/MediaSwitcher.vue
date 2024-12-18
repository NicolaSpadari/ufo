<template>
	<div v-if="post.post_hint === 'rich:video'" class="video-wrapper w-full" h="42rem" v-html="post.secure_media_embed?.content?.replace('position:absolute;', '')" />

	<div v-else-if="post.post_hint === 'hosted:video'">
		<media-player
			ref="player"
			:src="post.secure_media?.reddit_video?.fallback_url"
			cross-origin auto-play muted plays-inline h="42rem"
			@can-play="player?.play()"
		>
			<media-provider>
				<media-poster
					:src="previewImage"
					class="vds-poster"
				/>
			</media-provider>

			<media-video-layout />
		</media-player>
	</div>

	<div v-else-if="post.is_gallery">
		<div relative>
			<div w-full bg-neutral-700>
				<NuxtImg :src="post.media_metadata[state.media_id].p[post.media_metadata[state.media_id].p.length - 1].u" mx-auto />
			</div>

			<div bg-main absolute absolute-center-h bottom-3 flex items-center gap-2 rounded-full p-2 text-sm text-gray-400 shadow-sm>
				<button type="button" @click="prev()">
					<Icon name="heroicons-solid:chevron-left" size-4 />
				</button>
				<span>{{ curIndex }} / {{ post.gallery_data?.items?.length }}</span>
				<button type="button" @click="next()">
					<Icon name="heroicons-solid:chevron-right" size-4 />
				</button>
			</div>
		</div>
	</div>

	<div v-else-if="post.post_hint === 'image' || post.post_hint === 'link'" h-full>
		<div class="group" relative h-full w-full bg-neutral-700>
			<NuxtImg v-if="post.is_reddit_media_domain" :src="post.url" h="42rem" mx-auto object-contain />
			<NuxtImg v-else :src="previewImage" h="42rem" mx-auto object-contain />

			<DialogTrigger as-child>
				<button
					type="button"
					absolute bottom-2 right-2 size-8 flex-center rounded-full bg-zinc-800 opacity-0 shadow-xl transition-opacity
					class="expander group-hover:opacity-100"
					@click="activePost = props.post"
				>
					<Icon name="heroicons-outline:arrows-pointing-out" size-5 text-zinc-100 />
				</button>
			</DialogTrigger>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import "vidstack/player";
	import "vidstack/player/ui";
	import "vidstack/player/layouts";

	const props = defineProps<{
		post: Submission
	}>();

	const post = toRef(props.post);
	const { activePost } = useReddit();

	const player = ref<MediaPlayerElement | null>(null);

	if (props.post.crosspost_parent && props.post.crosspost_parent !== "") {
		post.value = props.post.crosspost_parent_list[0];
	}

	const previewImage = post.value.preview?.images[0].resolutions[post.value.preview.images[0].resolutions.length - 1].url;
	const { state, index, next, prev } = useCycleList(post.value.gallery_data?.items || []);
	const curIndex = computed(() => index.value + 1);
</script>

<style>
	.video-wrapper > iframe {
		@apply size-full;
	}
	.vds-google-cast-button,
	.vds-menu-button{
		@apply hidden;
	}
</style>
