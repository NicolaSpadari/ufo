<template>
	<div flex flex-col mb-4>
		<div overflow-hidden rounded-lg>
			<NuxtImg v-if="props.subreddit.banner_background_image" :src="props.subreddit.banner_background_image" h-36 />
			<div v-else h-36 w-full flex flex-center bg="accent/50">
				<h1 text-5xl text="light/60" font-bold font-heading pointer-events-none>
					{{ props.subreddit.display_name_prefixed }}
				</h1>
			</div>
		</div>
		<div flex gap-4 p-3 mt="-15" items-end>
			<SubredditIcon :image="props.subreddit.icon_img" size="big" />
			<h1 text-3xl text-light font-bold font-heading>
				{{ props.subreddit.display_name_prefixed }}
			</h1>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		subreddit: Subreddit
	}>();
</script>
