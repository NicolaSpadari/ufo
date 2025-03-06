<template>
	<UPageCard
		orientation="vertical"
		:ui="{
			wrapper: 'w-full',
			container: 'lg:flex'
		}"
	>
		<template #header>
			<div class="flex items-start justify-between">
				<PostHeading :post="props.post" />
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
		</template>
		<template #title>
			<ProseP class="my-0">
				{{ props.post.title }}
			</ProseP>
		</template>
		<template #body>
			<div v-if="props.post.selftext !== ''" class="my-3 h-42rem">
				<div :class="{ 'line-clamp-3': props.type !== 'full' }" class="text-sm text-light font-text" v-html="props.post.selftext_html" />
			</div>
			<PostMedia v-if="hasMedia" :post="props.post" />
		</template>
		<template #footer>
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
		</template>
	</UPageCard>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		post: Submission
		from: "feed" | "subreddit"
		type?: string
	}>();

	const { productionUrl } = useConstants();
	const { formatNumber, socialNetworks } = useUtils();

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
