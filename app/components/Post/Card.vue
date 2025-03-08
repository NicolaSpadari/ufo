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
		<template #body>
			<ProseP class="line-clamp-1 mt-0">
				<NuxtLink :to="`/comments/${props.post.name}`">
					{{ props.post.title }}
				</NuxtLink>
			</ProseP>
			<ClientOnly v-if="props.post.is_self && props.post.selftext !== ''">
				<div
					v-html="decodeHtml(props.post.selftext_html)"
					class="line-clamp-4"
				/>
			</ClientOnly>
			<PostMedia v-else :post="props.post" />
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

	const { decodeHtml } = useUtils();
</script>
