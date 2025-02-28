<template>
	<UNavigationMenu
		orientation="vertical"
		:items="sidebarContent"
		class="data-[orientation=vertical]:w-48"
	/>

	<div>
		Sidebar
	</div>
</template>

<script setup lang="ts">
	const { subscriptions, favorites, following, multireddits } = useReddit();

	// console.log(subscriptions.value);

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
			children: favorites.value.map((favorite) => {
				console.log(favorite);
				return {
					label: favorite.data.display_name_prefixed,
					avatar: favorite.data.icon_img
				};
			})
		},
		{
			label: "Following",
			icon: "i-lucide-users",
			children: following.value.map((following) => ({
				label: following.display_name_prefixed,
				avatar: following.icon_img
			}))
		},
		{
			label: "Subscriptions",
			icon: "i-lucide-bell",
			children: subscriptions.value.map((subscription) => {
				console.log(subscription);
				return {
					label: subscription.data.display_name_prefixed,
					avatar: {
						src: subscription.data.icon_img,
						alt: subscription.data.display_name_prefixed
					}
				};
			})
		}
	]);
</script>
