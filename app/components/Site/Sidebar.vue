<template>
	<UNavigationMenu
		orientation="vertical"
		:items="sidebarContent"
		class="data-[orientation=vertical]:w-48"
	/>
</template>

<script setup lang="ts">
	const { subscriptions, favorites, following } = useReddit();

	const sidebarContent = ref([
		// {
		// 	title: "Multireddits",
		// 	handle: "multireddits",
		// 	multiredditList: multireddits,
		// 	open: true
		// },
		{
			label: "Favorites",
			icon: "i-lucide-star",
			children: favorites.value.map((favorite) => ({
				label: favorite.display_name_prefixed,
				avatar: {
					src: favorite.icon_img,
					alt: favorite.display_name_prefixed
				},
				to: favorite.url
			}))
		},
		{
			label: "Following",
			icon: "i-lucide-users",
			children: following.value.map((following) => ({
				label: following.display_name_prefixed,
				avatar: {
					src: following.icon_img,
					alt: following.display_name_prefixed
				},
				to: following.url
			}))
		},
		{
			label: "Subscriptions",
			icon: "i-lucide-bell",
			children: subscriptions.value.map((subscription) => ({
				label: subscription.display_name_prefixed,
				avatar: {
					src: subscription.icon_img,
					alt: subscription.display_name_prefixed
				},
				to: subscription.url
			}))
		}
	]);
</script>
