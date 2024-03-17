<template>
	<div mb-4 flex flex-col>
		<div overflow-hidden rounded-lg>
			<NuxtImg v-if="props.subreddit?.banner_background_image" :src="props.subreddit.banner_background_image" h-36 />
			<div v-else h-36 w-full flex flex-center bg="accent/50">
				<h1 text="light/60" text-5xl font-bold font-heading>
					u/{{ props.type === "subreddit" ? props.subreddit?.display_name_prefixed : props.redditor?.name }}
				</h1>
			</div>
		</div>
		<div mt="-15" flex items-end gap-4 p-3>
			<SubredditIcon :image="props.type === 'subreddit' ? props.subreddit?.icon_img : props.redditor.snoovatar_img" size="big" />
			<h1 text-3xl text-light font-bold font-heading>
				u/{{ props.type === "subreddit" ? props.subreddit?.display_name_prefixed : props.redditor?.name }}
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
</script>
