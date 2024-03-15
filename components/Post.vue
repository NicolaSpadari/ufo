<template>
	<div flex flex-col gap-2 rounded-xl bg-raised p-3>
		<div flex justify-between>
			<div flex items-center gap-3>
				<SubredditIcon :image="subredditIcon" size="big" />
				<div flex flex-col>
					<NuxtLink :to="`/${props.post.subreddit_name_prefixed}`" text-light font-text>
						{{ props.post.subreddit_name_prefixed }}
					</NuxtLink>
					<NuxtLink :to="`/u/${authorName}`" text-xs text-neutral-400 font-text hover="underline">
						u/{{ authorName }}
					</NuxtLink>
				</div>
			</div>
			<button h-6 w-6 flex flex-center rounded-full hover="bg-elevated">
				<i-heroicons-solid-ellipsis-horizontal text-light />
			</button>
		</div>
		<div>
			<p text-lg text-light font-text>
				{{ props.post.title }}
			</p>
		</div>
		<div my-3 overflow-hidden rounded-xl shadow-lg>
			<div
				v-if="props.post.secure_media?.type?.includes('redgifs.com')"
				:style="{
					height: `${props.post.secure_media.oembed?.height}px`,
				}"
				v-html="props.post.secure_media.oembed?.html.replace('position:absolute;', '')"
			/>

			<VuePlyr v-else-if="props.post.secure_media?.reddit_video?.fallback_url" :options="{ autoplay: true }">
				<video controls playsinline :data-poster="{ previewImage: props.post.preview?.images }">
					<source :src="props.post.secure_media.reddit_video.fallback_url">
				</video>
			</VuePlyr>

			<div v-else-if="props.post.gallery_data?.items?.length" relative>
				<NuxtImg :src="props.post.media_metadata[state.media_id].p[3].u" max-h="32rem" mx-auto />

				<div absolute-center-h absolute bottom-3 flex items-center gap-2 rounded-full bg-main p-2 text-sm text-gray-400 shadow-sm>
					<button i-heroicons-solid-chevron-left h-4 w-4 @click="prev()" />
					<span>{{ curIndex }} / {{ props.post.gallery_data?.items?.length }}</span>
					<button i-heroicons-solid-chevron-right h-4 w-4 @click="next()" />
				</div>
			</div>

			<NuxtImg v-else-if="props.post.url_overridden_by_dest" :src="props.post.url_overridden_by_dest" max-h="32rem" mx-auto />

			<NuxtImg v-else-if="props.post.preview?.images" :src="previewImage" max-h="32rem" mx-auto />
		</div>
		<div flex gap-3>
			<div flex items-center gap-2 rounded-full bg-main hover="bg-main/70" p-2 text-sm text-gray-400 shadow-sm>
				<button i-heroicons-solid-chevron-up h-4 w-4 hover="text-orange-500" />
				<span>{{ formatNumber(props.post.score) }}</span>
				<button i-heroicons-solid-chevron-down h-4 w-4 hover="text-blue-500" />
			</div>
			<button hover="bg-main/70" flex items-center gap-2 rounded-full bg-main p-2 px-3 text-sm text-gray-400 shadow-sm>
				<i-heroicons-outline-chat-bubble-oval-left h-4 w-4 />
				<span>{{ formatNumber(props.post.num_comments) }}</span>
			</button>
			<button hover="bg-main/70" flex items-center gap-2 rounded-full bg-main p-2 px-3 text-sm text-gray-400 shadow-sm @click="share()">
				<i-heroicons-outline-share h-4 w-4 />
				<span>Share</span>
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		post: Submission
	}>();

	console.log(props.post);

	const { formatNumber, share } = useUtils();

	const subredditIcon = await props.post.subreddit.icon_img;
	const authorName = await props.post.author.name;
	const previewImage = props.post.preview?.images[0].resolutions[props.post.preview.images[0].resolutions.length - 1].url;
	const { state, index, next, prev } = useCycleList(props.post.gallery_data?.items || []);
	const curIndex = computed(() => index.value + 1);
</script>
