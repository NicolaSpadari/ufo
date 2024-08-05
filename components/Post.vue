<template>
	<div flex flex-col gap-2 rounded-xl bg-zinc-900 p-3>
		<div flex justify-between items-start>
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
			<DropdownMenuRoot>
				<DropdownMenuTrigger>
					<div size-6 flex-center rounded-full hover="bg-zinc-800">
						<Icon name="heroicons-solid:ellipsis-horizontal" text-zinc-100 />
					</div>
				</DropdownMenuTrigger>

				<DropdownMenuPortal>
					<DropdownMenuContent
						min-w="160px" rounded-md bg-zinc-900 border border-zinc-700 p="5px" shadow-xl outline-none
						ui-open="animate-slideDownAndFade"
						ui-closed="animate-slideUpAndFade"
						:side-offset="13"
					>
						<DropdownMenuArrow fill-zinc-700 />
						<DropdownMenuItem
							as-child
							relative h-8 flex select-none items-center rounded-md px-3 text-sm text-green-600 leading-none outline-none
							class="data-[highlighted]:(bg-green-600 text-zinc-100)"
						>
							<button type="button" w-full @click="console.log(post)">
								Debug
							</button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenuPortal>
			</DropdownMenuRoot>
		</div>
		<p text-lg text-light font-text>
			{{ props.post.title }}
		</p>
		<div v-if="props.post.selftext !== ''" my-3 max-h="48rem">
			<p line-clamp-3 text-sm text-light font-text>
				{{ props.post.selftext }}
			</p>
		</div>
		<div v-if="hasMedia" my-3 overflow-hidden rounded-xl shadow-lg max-h="48rem">
			<MediaSwitcher :post="props.post" />
		</div>
		<div flex gap-3>
			<Action>
				<template #left>
					<Icon
						name="heroicons-solid:chevron-up" size-4
						:class="{
							'text-orange-500': upvoted,
						}"
						hover="text-orange-500"
						transition-colors
						@click="upvote()"
					/>
				</template>
				<template #center>
					<span
						pointer-events-none
						:class="{
							'text-orange-500': upvoted,
							'text-blue-500': downvoted,
						}"
					>{{ formatNumber(props.post.score) }}</span>
				</template>
				<template #right>
					<Icon
						name="heroicons-solid:chevron-down" size-4
						:class="{
							'text-blue-500': downvoted,
						}"
						hover="text-blue-500"
						transition-colors
						@click="downvote()"
					/>
				</template>
			</Action>
			<Action :to="`/comment/${props.post.id}`">
				<template #left>
					<Icon name="heroicons-outline:chat-bubble-oval-left" size-4 />
				</template>
				<template #center>
					{{ formatNumber(props.post.num_comments) }}
				</template>
			</Action>
			<DropdownMenuRoot>
				<DropdownMenuTrigger>
					<Action>
						<template #left>
							<Icon name="heroicons-outline:share" size-4 />
						</template>
						<template #center>
							Share
						</template>
					</Action>
				</DropdownMenuTrigger>

				<DropdownMenuPortal>
					<DropdownMenuContent
						min-w="220px" rounded-md bg-zinc-900 border border-zinc-700 p="5px" shadow-xl outline-none
						ui-open="animate-slideDownAndFade"
						ui-closed="animate-slideUpAndFade"
						:side-offset="13"
					>
						<DropdownMenuArrow fill-zinc-700 />
						<DropdownMenuItem
							v-for="network in socialNetworks"
							:key="network"
							as-child
							relative h-8 flex select-none items-center rounded-md px-2 text-sm text-main leading-none outline-none
							class="data-[highlighted]:(bg-green-600 text-zinc-100)"
						>
							<SocialShare
								:network="network"
								:styled="false"
								:label="true"
								:title="postInfos.title"
								:url="postInfos.url"
								w-full text-green-600 space-x-2
							>
								<template #label>
									<span capitalize text-zinc-100>{{ network }}</span>
								</template>
							</SocialShare>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenuPortal>
			</DropdownMenuRoot>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		post: Submission
		from: "feed" | "subreddit"
	}>();

	const { productionUrl } = useConstants();
	const { formatNumber, socialNetworks } = useUtils();
	const { client } = useReddit();

	const subredditIcon = await props.post.subreddit?.icon_img;
	const authorImage = await props.post.author.icon_img;
	const authorName = await props.post.author.name;
	const upvoted = ref(false);
	const downvoted = ref(false);

	const postInfos = {
		title: props.post.title,
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
