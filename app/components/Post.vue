<template>
	<div class="flex flex-col gap-2 rounded-xl bg-zinc-900 p-3">
		<div class="flex items-start justify-between">
			<div class="flex items-center gap-3">
				<UUser
					:name="props.type === 'feed' ? props.post.subreddit_name_prefixed : props.post.author"
					:description="props.type === 'feed' ? props.post.subreddit_name_prefixed : props.post.author"
					:avatar="{
						src: stripParams(props.type === 'feed' ? props.post.subreddit.icon_img : props.post.author.icon_img),
						alt: props.type === 'feed' ? props.post.subreddit_name_prefixed : props.post.author
					}"
					:to="props.type === 'feed' ? `/r/${props.post.subreddit_name_prefixed}` : `/u/${props.post.author}`"
				/>
				{{ getTimeAgo(props.post.created) }}
			</div>
			<UDropdownMenu
				:items="[{
					label: 'Debug',
					icon: 'i-lucide-terminal',
					onSelect() {
						console.log(props.post);
					}
				}]" :content="{ align: 'end' }"
			>
				<UButton icon="i-lucide-ellipsis" variant="ghost" color="neutral" />
			</UDropdownMenu>
		</div>
		<p class="text-lg text-light font-text">
			{{ props.post.title }}
		</p>
		<div v-if="props.post.selftext !== ''" class="my-3 h-42rem">
			<div :class="{ 'line-clamp-3': props.type !== 'full' }" class="text-sm text-light font-text" v-html="props.post.selftext_html" />
		</div>
		<div v-if="hasMedia" class="my-3 overflow-hidden rounded-xl shadow-lg h-42rem flex items-center">
			<MediaSwitcher :post="props.post" />
		</div>
		<div class="flex gap-3">
			<UButtonGroup>
				<UButton icon="i-lucide-chevron-up" variant="soft" color="neutral" :class="{ 'text-orange-500': upvoted }" @click="upvote()" />
				<UBadge
					variant="soft" color="neutral" :class="{
						'text-orange-500': upvoted,
						'text-blue-500': downvoted
					}"
				>
					{{ formatNumber(props.post.score) }}
				</UBadge>
				<UButton icon="i-lucide-chevron-down" variant="soft" color="neutral" :class="{ 'text-blue-500': downvoted }" @click="downvote()" />
			</UButtonGroup>

			<UButton leading-icon="lucide:message-circle" variant="ghost" color="neutral">
				{{ formatNumber(props.post.num_comments) }}
			</UButton>

			<UDropdownMenu :items="socialDropdownItems">
				<UButton leading-icon="lucide:share" variant="ghost" color="neutral">
					Share
				</UButton>
			</UDropdownMenu>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		post: Submission
		from: "feed" | "subreddit"
		type?: string
	}>();

	const { productionUrl } = useConstants();
	const { formatNumber, stripParams, socialNetworks } = useUtils();

	const upvoted = ref(false);
	const downvoted = ref(false);

	const socialDropdownItems = ref(socialNetworks.map((network) => ({
		label: network,
		onSelect() {
			useSocialShare({
				network,
				title: props.post.title,
				url: `${productionUrl}/comment/${props.post.id}`
			});
		}
	})));

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
		// client.value!.getSubmission(props.post.id).upvote();
		// upvoted.value = true;
		// downvoted.value = false;
		console.log("upvote");
	};

	const downvote = () => {
		// client.value!.getSubmission(props.post.id).downvote();
		// upvoted.value = false;
		// downvoted.value = true;
		console.log("downvote");
	};
</script>
