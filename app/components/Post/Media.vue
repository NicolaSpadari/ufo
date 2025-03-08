<template>
	<div class="max-h-[36rem]">
		<div
			v-if="props.post.post_hint === 'image'"
			class="grid-stack place-items-center h-full rounded-[calc(var(--ui-radius)*2)] overflow-hidden"
		>
			<NuxtImg
				:src="previewImage"
				:placeholder="img(props.post.thumbnail, { blur: 10 })"
				class="grid-area-stack size-full max-h-[36rem] object-contain z-[1] cursor-pointer"
				@click="handleZoom()"
			/>
			<NuxtImg
				:src="props.post.thumbnail"
				class="grid-area-stack size-full max-h-[36rem] object-cover opacity-75 blur-xl"
			/>
		</div>

		<ClientOnly v-if="post.post_hint === 'rich:video'">
			<div
				class="video-wrapper w-full max-h-[36rem]"
				v-html="decodeHtml(post.secure_media_embed?.content?.replace('position:absolute;', ''))"
			/>
		</ClientOnly>

		<div v-if="post.post_hint === 'hosted:video'">
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

		<div v-if="post.is_gallery">
			<UCarousel
				v-slot="props: { item?: any }"
				arrows
				dots
				:items="Object.values(post.media_metadata) as any[]"
				:ui="{
					prev: 'start-4',
					next: 'end-4',
					dots: 'py-2 px-3 absolute-center-h bg-(--ui-bg)/50 backdrop-blur rounded-full bottom-3 w-fit',
					dot: 'size-2'
				}"
			>
				<div class="grid-stack place-items-center h-full rounded-[calc(var(--ui-radius)*2)] overflow-hidden">
					<NuxtImg
						:src="fixSource(props.item?.p.at(-1).u)"
						:placeholder="img(fixSource(props.item?.p.at(-1).u), { blur: 10 })"
						class="grid-area-stack h-full max-h-[36rem] object-contain z-[1] cursor-pointer"
						@click="handleZoom()"
					/>
					<NuxtImg
						:src="fixSource(props.item?.p.at(-1).u)"
						class="grid-area-stack size-full max-h-[36rem] object-cover opacity-75 blur-xl"
					/>
				</div>
			</UCarousel>
		</div>

		<NuxtLink
			v-if="props.post.post_hint === 'link'"
			class="grid-stack place-items-center h-full rounded-[calc(var(--ui-radius)*2)] overflow-hidden relative"
			:to="props.post.url"
			target="_blank"
		>
			<div class="flex items-center justify-between w-full py-1 px-2">
				<ProseP class="text-xs my-0">
					{{ props.post.url }}
				</ProseP>
				<UIcon name="lucide:external-link" />
			</div>
			<NuxtImg
				:src="previewImage"
				:placeholder="img(props.post.thumbnail, { blur: 10 })"
				class="grid-area-stack size-full max-h-[36rem] object-contain z-[1] cursor-pointer"
			/>
			<NuxtImg
				:src="props.post.thumbnail"
				class="grid-area-stack size-full max-h-[36rem] object-cover opacity-75 blur-xl"
			/>
		</NuxtLink>
	</div>
</template>

<script lang="ts" setup>
	import "vidstack/player";
	import "vidstack/player/ui";
	import "vidstack/player/layouts";

	const props = defineProps<{
		post: Submission
	}>();

	const img = useImage();
	const { modalOpen, activeMedia } = useUI();
	const { fixSource, decodeHtml } = useUtils();

	const previewImage = computed(() => {
		if (props.post.is_reddit_media_domain) return props.post.url;
		return fixSource(props.post.preview?.images[0].resolutions.at(-1).url);
	});

	const post = toRef(props.post);

	const player = ref<MediaPlayerElement | null>(null);

	if (props.post.crosspost_parent && props.post.crosspost_parent !== "") {
		post.value = props.post.crosspost_parent_list[0];
	}

	const handleZoom = () => {
		activeMedia.value = previewImage.value;
		modalOpen.value = true;
	};
</script>
