<template>
	<div class="flex items-start justify-between">
		<UUser
			:avatar="{
				src: fixSource(postIcon),
				alt: props.post.subreddit_name_prefixed
			}"
		>
			<template #name>
				<ULink :to="props.post.subreddit_name_prefixed">
					{{ props.post.subreddit_name_prefixed }}
				</ULink>
			</template>
			<template #description>
				<ULink :to="`/u/${props.post.author}`">
					{{ props.post.author }}
				</ULink>
				&middot;
				{{ getTimeAgo(props.post.created) }}
			</template>
		</UUser>
		<div class="flex items-center gap-x-2">
			<UTooltip v-if="props.post.locked" text="This conversation has been locked">
				<UIcon name="lucide:lock" class="text-(--ui-warning)" />
			</UTooltip>
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
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		post: Submission
	}>();

	const { fixSource, getTimeAgo } = useUtils();

	const postIcon = computed(() => {
		if (props.post.sr_detail?.icon_img !== "") return props.post.sr_detail?.icon_img;
		if (props.post.sr_detail?.community_icon !== "") return props.post.sr_detail?.community_icon;
		return "";
	});
</script>
