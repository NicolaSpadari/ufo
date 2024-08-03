<template>
	<div h-full flex flex-col overflow-y-auto bg-white py-6 lg="shadow-none py-0" shadow-md>
		<AccordionRoot
			w-full rounded-md bg-mauve6
			type="multiple"
			:collapsible="true"
		>
			<GroupList
				v-for="content in sidebarContent"
				:key="content.handle"
				:title="content.title"
				:handle="content.handle"
				:subreddit-list="content.subredditList"
				:multireddit-list="content.multiredditList"
			/>
		</AccordionRoot>
	</div>
</template>

<script setup lang="ts">
	const { subscriptions, favorites, multireddits } = storeToRefs(useRedditStore());

	const sidebarContent = [
		{
			title: "Multireddits",
			handle: "multireddits",
			multiredditList: multireddits.value
		},
		{
			title: "Favorites",
			handle: "favorites",
			subredditList: favorites.value
		},
		{
			title: "Subscriptions",
			handle: "subscriptions",
			subredditList: subscriptions.value
		}
	];
</script>
