<template>
	<UUser
		:avatar="{
			src: stripParams(postIcon),
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
</template>

<script lang="ts" setup>
	const props = defineProps<{
		post: Submission
	}>();

	const { stripParams, getTimeAgo } = useUtils();

	const postIcon = computed(() => {
		if (props.post.sr_detail.icon_img !== "") return props.post.sr_detail.icon_img;
		if (props.post.sr_detail.community_icon !== "") return props.post.sr_detail.community_icon;
		return "";
	});
</script>
