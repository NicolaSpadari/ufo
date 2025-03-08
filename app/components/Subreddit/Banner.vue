<template>
	<!-- <div mb-4 flex flex-col>
		<div overflow-hidden rounded-lg>
			<div v-if="props.subreddit?.banner_background_image" h-36 overflow-hidden>
				<NuxtImg :src="props.subreddit.banner_background_image" size-full object-cover object-cc />
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
	</div> -->

	<UPageCard
		variant="ghost"
		:ui="{
			container: 'lg:flex flex-row justify-between items-center px-0 pt-0 sm:px-0 sm:pt-0'
		}"
	>
		<UUser
			:name="props.subreddit.display_name_prefixed"
			:avatar="{
				src: fixSource(subredditIcon),
				alt: props.subreddit.display_name_prefixed
			}"
			size="3xl"
		/>
		<div class="flex items-center gap-x-2">
			<UDropdownMenu
				:items="[{
					label: 'Debug',
					icon: 'i-lucide-terminal',
					onSelect() {
						console.log(props.subreddit);
					}
				}]" :content="{ align: 'end' }"
			>
				<UButton icon="i-lucide-ellipsis" variant="subtle" color="neutral" />
			</UDropdownMenu>
		</div>
	</UPageCard>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		type: "subreddit" | "user"
		subreddit: Subreddit
		redditor?: RedditUser
	}>();

	const { fixSource } = useUtils();

	const subredditIcon = computed(() => {
		if (props.subreddit.icon_img !== "") return props.subreddit.icon_img;
		if (props.subreddit.community_icon !== "") return props.subreddit.community_icon;
		return "";
	});
</script>
