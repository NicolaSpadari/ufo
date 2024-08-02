<template>
	<div h-full flex flex-col overflow-y-auto bg-white py-6 lg="shadow-none py-0" shadow-md>
		<AccordionRoot
			class="bg-mauve6 w-full rounded-md shadow-[0_2px_10px] shadow-black/5"
			default-value="subscriptions"
			type="single"
			:collapsible="true"
		>
			<GroupList
				v-for="content in sidebarContent"
				:key="content.handle"
				:title="content.title"
				:handle="content.handle"
				:list="content.list"
				:multi-list="content.multiList"
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
			multiList: multireddits.value
		},
		{
			title: "Favorites",
			handle: "favorites",
			list: favorites.value
		},
		{
			title: "Subscriptions",
			handle: "subscriptions",
			list: subscriptions.value
		}
	];
</script>
