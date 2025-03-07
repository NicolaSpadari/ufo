<template>
	<UDropdownMenu
		:items="items"
		:ui="{
			content: 'w-48'
		}"
	>
		<UButton
			variant="ghost"
			:ui="{
				base: 'p-0 hover:bg-transparent'
			}"
		>
			<template #default>
				<UUser
					:name="(user as RedditUser).name"
					:description="`Karma ${formatNumber((user as RedditUser).total_karma)}`"
					:avatar="{
						src: fixSource((user as RedditUser)?.icon_img),
						alt: (user as RedditUser).name || ''
					}"
					:ui="{
						wrapper: 'hidden text-left lg:block'
					}"
				/>
			</template>
		</UButton>
	</UDropdownMenu>
</template>

<script lang="ts" setup>
	const { user, logout } = useReddit();
	const { formatNumber, fixSource } = useUtils();

	const items = ref([
		{
			label: "Profile",
			icon: "i-lucide-user",
			to: `/${(user.value as RedditUser).subreddit?.display_name_prefixed}`
		},
		{
			label: "Settings",
			icon: "i-lucide-settings",
			to: "/settings"
		},
		{
			label: "Logout",
			icon: "i-lucide-log-out",
			onSelect() {
				logout();
			}
		}
	]);
</script>
