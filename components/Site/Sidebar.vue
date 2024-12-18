<template>
	<div lg="shadow-none py-3" h-full flex flex-col overflow-y-auto bg-zinc-800 p-2 shadow-md custom-scrollbar>
		<AccordionRoot
			w-full rounded-md
			type="multiple"
			:collapsible="true"
		>
			<Accordion
				v-for="content in sidebarContent"
				:key="content.handle"
				:title="content.title"
				:handle="content.handle"
				:subreddit-list="content.subredditList"
				:multireddit-list="content.multiredditList"
				:open="content.open"
				first="rounded-t-md" last="rounded-b-md"
				@toggle="content.open = !content.open"
			/>
		</AccordionRoot>
	</div>
</template>

<script setup lang="ts">
	const { subscriptions, favorites, following, multireddits } = storeToRefs(useRedditStore());

	console.log("following", following.value)

	const sidebarContent = ref([
		{
			title: "Multireddits",
			handle: "multireddits",
			multiredditList: multireddits,
			open: true
		},
		{
			title: "Favorites",
			handle: "favorites",
			subredditList: favorites,
			open: true
		},
		{
			title: "Following",
			handle: "following",
			subredditList: following,
			open: true
		},
		{
			title: "Subscriptions",
			handle: "subscriptions",
			subredditList: subscriptions,
			open: true
		}
	]);
</script>
