<template>
	<UPageCard
		orientation="vertical"
		:ui="{
			wrapper: 'w-full',
			container: 'lg:flex'
		}"
	>
		<template #header>
			<PostHeading :post="props.post" />
		</template>
		<template #title>
			<ProseP class="my-0">
				{{ props.post.title }}
			</ProseP>
		</template>
		<template #body>
			<PostText v-if="props.post.selftext !== ''" :post="props.post" />
			<PostMedia v-if="hasMedia" :post="props.post" />
		</template>
		<template #footer>
			<PostActions :post="props.post" />
		</template>
	</UPageCard>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		post: Submission
		from: "feed" | "subreddit"
		type?: string
	}>();

	const hasMedia = computed(() => {
		return props.post.post_hint === "rich:video"
			|| props.post.post_hint === "hosted:video"
			|| props.post.is_gallery
			|| props.post.post_hint === "image"
			|| props.post.post_hint === "link";
	});
</script>
