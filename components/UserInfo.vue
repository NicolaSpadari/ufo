<template>
	<DropdownMenuRoot v-model:open="toggleState">
		<DropdownMenuTrigger>
			<div flex gap-x-2>
				<AvatarRoot class="bg-blackA3 h-[45px] w-[45px] inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle">
					<AvatarImage
						class="h-full w-full rounded-[inherit] object-cover"
						:src="user?.icon_img || ''"
						alt="Colm Tuite"
					/>
					<AvatarFallback
						class="h-full w-full flex items-center justify-center bg-white text-[15px] text-grass11 font-medium leading-1"
						:delay-ms="600"
					>
						{{ getInitials(user!.name) }}
					</AvatarFallback>
				</AvatarRoot>
				<div class="flex items-start flex-col">
					<div class="text-sm text-mauve12 font-medium leading-[1.5]">
						{{ user!.name }}
					</div>
					<div class="text-sm text-mauve10 leading-[1.5]">
						Karma {{ formatNumber(user!.total_karma) }}
					</div>
				</div>
			</div>
		</DropdownMenuTrigger>

		<DropdownMenuPortal>
			<DropdownMenuContent
				class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] outline-none space-y-2"
				:side-offset="10"
			>
				<DropdownMenuItem
					class="relative h-8 flex select-none items-center rounded-[3px] px-1 text-sm text-grass11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[disabled]:text-mauve8 data-[highlighted]:text-green1"
				>
					<NuxtLink :to="`/${user?.subreddit?.display_name_prefixed}`" w-full px-1>
						Profile
					</NuxtLink>
				</DropdownMenuItem>
				<DropdownMenuItem
					class="relative h-8 flex select-none items-center rounded-[3px] px-1 text-sm text-grass11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[disabled]:text-mauve8 data-[highlighted]:text-green1"
				>
					<NuxtLink to="/settings" w-full px-1>
						Settings
					</NuxtLink>
				</DropdownMenuItem>
				<DropdownMenuItem
					class="relative h-8 flex select-none items-center rounded-[3px] px-1 text-sm text-red-500 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-red-400 data-[disabled]:text-mauve8 data-[highlighted]:text-red-1"
				>
					<button type="button" w-full px-1 text-left @click="logout()">
						Logout
					</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenuPortal>
	</DropdownMenuRoot>

	<!-- <Dropdown id="userProfile">
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
	</Dropdown> -->
</template>

<script lang="ts" setup>
	const { logout } = useReddit();
	const { user } = storeToRefs(useRedditStore());
	const { formatNumber, getInitials } = useUtils();

	const toggleState = ref(false);
</script>
