<template>
	<div mb-4 flex flex-col>
		<div overflow-hidden rounded-lg>
			<div v-if="props.subreddit?.banner_background_image" h-36 overflow-hidden>
				<NuxtImg :src="props.subreddit.banner_background_image" w-full object-cover object-cc />
			</div>
			<div v-else h-36 w-full flex flex-center bg="accent/50">
				<h1 text="light/60" text-5xl font-bold font-heading>
					{{ props.type === "subreddit" ? props.subreddit?.display_name_prefixed : `u/${props.redditor?.name}` }}
				</h1>
			</div>
		</div>
		<div mt="-15" flex items-end gap-4 p-3>
			<SubredditIcon :image="props.type === 'subreddit' ? getIcon(props.subreddit) : props.redditor?.snoovatar_img" size="big" />
			<h1 text-3xl text-light font-bold font-heading>
				{{ props.type === "subreddit" ? props.subreddit?.display_name_prefixed : `u/${props.redditor?.name}` }}
			</h1>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		type: "subreddit" | "user"
		subreddit?: Subreddit
		redditor?: RedditUser
	}>();

	const { getIcon } = useUtils();
</script>
