<template>
	<div flex flex-col gap-2 rounded-xl bg-raised p-3>
		<div flex justify-between>
			<div flex items-center gap-3>
				<template v-if="props.from === 'feed'">
					<SubredditIcon :image="subredditIcon" size="medium" />
					<div flex flex-col>
						<div flex-center gap-2>
							<NuxtLink :to="`/${props.post.subreddit_name_prefixed}`" text-light font-text>
								{{ props.post.subreddit_name_prefixed }}
							</NuxtLink>
							<span text-xs text-neutral-400>{{ getTimeAgo(props.post.created) }}</span>
						</div>
						<NuxtLink :to="`/u/${authorName}`" text-xs text-neutral-400 font-text hover="underline">
							u/{{ authorName }}
						</NuxtLink>
					</div>
				</template>
				<template v-if="props.from === 'subreddit'">
					<SubredditIcon :image="authorImage" size="medium" />
					<div flex flex-col>
						<NuxtLink :to="`/u/${authorName}`" text-light font-text>
							u/{{ authorName }}
						</NuxtLink>
					</div>
				</template>
			</div>
			<Dropdown :id="`post-${post.id}`">
				<template #button>
					<div h-6 w-6 flex flex-center rounded-full hover="bg-elevated">
						<i-heroicons-solid-ellipsis-horizontal text-light />
					</div>
				</template>
				<template #content>
					<div flex flex-col p-2>
						<DropdownEntry @click="console.log(post)">
							Debug
						</DropdownEntry>
					</div>
				</template>
			</Dropdown>
		</div>
		<p text-lg text-light font-text>
			{{ props.post.title }}
		</p>
		<div v-if="props.post.selftext !== ''" my-3 max-h="48rem">
			<p class="limit-lines" text-sm text-light font-text>
				{{ props.post.selftext }}
			</p>
		</div>
		<div v-if="hasMedia" my-3 overflow-hidden rounded-xl shadow-lg max-h="48rem">
			<MediaSwitcher :post="props.post" />
		</div>
		<div flex gap-3>
			<Action>
				<template #left>
					<i-heroicons-solid-chevron-up
						h-4 w-4
						:class="{
							'text-orange-500': upvoted,
						}"
						hover="text-orange-500"
						@click="upvote()"
					/>
				</template>
				<template #center>
					<span
						cursor-text
						:class="{
							'text-orange-500': upvoted,
							'text-blue-500': downvoted,
						}"
					>{{ formatNumber(props.post.score) }}</span>
				</template>
				<template #right>
					<i-heroicons-solid-chevron-down
						h-4 w-4
						:class="{
							'text-blue-500': downvoted,
						}"
						hover="text-blue-500"
						@click="downvote()"
					/>
				</template>
			</Action>
			<Action :to="`/comment/${props.post.id}`">
				<template #left>
					<i-heroicons-outline-chat-bubble-oval-left h-4 w-4 />
				</template>
				<template #center>
					{{ formatNumber(props.post.num_comments) }}
				</template>
			</Action>
			<Action @click="share(postInfos)">
				<template #left>
					<i-heroicons-outline-share h-4 w-4 />
				</template>
				<template #center>
					Share
				</template>
			</Action>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		post: Submission
		from: "feed" | "subreddit"
	}>();

	const { productionUrl } = useConstants();
	const { formatNumber, share } = useUtils();
	const { client } = useReddit();

	const subredditIcon = await props.post.subreddit?.icon_img;
	const authorImage = await props.post.author.icon_img;
	const authorName = await props.post.author.name;
	const upvoted = ref(false);
	const downvoted = ref(false);

	const postInfos = {
		title: props.post.title,
		text: props.post.selftext || "",
		url: `${productionUrl}/comment/${props.post.id}`
	};

	const hasMedia = computed(() => {
		return props.post.post_hint === "rich:video"
			|| props.post.post_hint === "hosted:video"
			|| props.post.is_gallery
			|| props.post.post_hint === "image"
			|| props.post.post_hint === "link";
	});

	const getTimeAgo = (timestamp: number) => {
		return useFormatDistance(useFromUnixTime(timestamp), new Date(), {
			addSuffix: true
		}).replace("about", "");
	};

	const upvote = () => {
		client.value!.getSubmission(props.post.id).upvote();
		upvoted.value = true;
		downvoted.value = false;
	};

	const downvote = () => {
		client.value!.getSubmission(props.post.id).downvote();
		upvoted.value = false;
		downvoted.value = true;
	};
</script>

<style scoped>
.limit-lines {
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	display: -webkit-box;
	overflow: hidden;
}
</style>
