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
							<i-heroicons-solid-star text-light />
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
				<NuxtLink :to="`/${user?.subreddit?.display_name_prefixed}`" w-full flex rounded-lg px-4 py-2 text-sm hover="bg-light/15">
					<span ml-auto text-light>Profile</span>
				</NuxtLink>
				<NuxtLink to="/settings" w-full flex rounded-lg px-4 py-2 text-sm hover="bg-light/15">
					<span ml-auto text-light>Settings</span>
				</NuxtLink>
				<button w-full flex items-center gap-2 rounded-lg px-4 py-2 text-sm hover="bg-red-700/25" @click="logout()">
					<span ml-auto text-red-600>Logout</span>
				</button>
			</div>
		</template>
	</Dropdown>
</template>

<script lang="ts" setup>
	const { logout } = useReddit();
	const { user } = storeToRefs(useRedditStore());
	const { formatNumber } = useUtils();
</script>
