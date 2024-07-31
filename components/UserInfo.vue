<template>
	<Dropdown id="userProfile">
		<template #button>
			<div flex items-center gap-3>
				<div relative>
					<NuxtImg h-12 w-12 flex-none rounded-full bg-gray-50 :src="user?.icon_img || 'https://via.placeholder.com/50'" />
					<div w="3.5" h="3.5" top="-0.5" right="-0.5" absolute border-2 border-raised rounded-full bg-accent />
				</div>
				<div flex-auto text-center>
					<p text-sm text-light font-semibold leading-6 font-text>
						{{ user?.name }}
					</p>
					<div flex items-center gap-1>
						<div h-3 w-3 flex-center rounded-full bg-accent>
							<Icon name="heroicons-solid:star" text-light />
						</div>
						<p text-xs text-accent font-text>
							Karma {{ formatNumber(user?.total_karma) }}
						</p>
					</div>
				</div>
			</div>
		</template>

		<template #content>
			<div flex flex-col p-2>
				<DropdownEntry :to="`/${user?.subreddit?.display_name_prefixed}`">
					Profile
				</DropdownEntry>
				<DropdownEntry to="/settings">
					Settings
				</DropdownEntry>
				<DropdownEntry @click="logout()" :special="true">
					Logout
				</DropdownEntry>
			</div>
		</template>
	</Dropdown>
</template>

<script lang="ts" setup>
	const { logout } = useReddit();
	const { user } = storeToRefs(useRedditStore());
	const { formatNumber } = useUtils();
</script>
