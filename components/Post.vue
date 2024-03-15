<template>
	<div flex flex-col gap-2 rounded-xl bg-raised p-3>
		<div flex justify-between>
			<div flex items-center gap-3>
				<SubredditIcon :image="subredditIcon" size="big" />
				<div flex flex-col>
					<NuxtLink to="/" text-light font-text>
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

			<NuxtImg v-else-if="props.post.preview?.images" :src="previewImage" w-full />
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

	console.log(props.post.media?.oembed?.html);

	const { formatNumber, share } = useUtils();

	const subredditIcon = await props.post.subreddit.icon_img;
	const authorName = await props.post.author.name;
	const previewImage = props.post.preview.images[0].resolutions[props.post.preview.images[0].resolutions.length - 1].url;
</script>
