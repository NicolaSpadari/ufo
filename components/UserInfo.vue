<template>
	<div>
		<DropdownMenuRoot>
			<DropdownMenuTrigger>
				<div flex gap-x-2>
					<AvatarRoot bg-blacka3 size-11 flex-center select-none overflow-hidden rounded-full>
						<AvatarImage
							size-full rounded-inherit bg-zinc-800 object-cover
							:src="user?.icon_img || ''"
							:alt="user!.name"
						/>
						<AvatarFallback
							size-full flex-center bg-zinc-800 text="15px" text-green-600 font-medium leading-1
							:delay-ms="600"
						>
							{{ getInitials(user!.name) }}
						</AvatarFallback>
					</AvatarRoot>
					<div hidden lg="flex flex-col items-start">
						<div text-sm text-zinc-100 font-medium leading="[1.5]">
							{{ user!.name }}
						</div>
						<div text-sm text-zinc-400 leading="[1.5]">
							Karma {{ formatNumber(user!.total_karma) }}
						</div>
					</div>
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuPortal>
				<DropdownMenuContent
					min-w="220px" p="5px" border border-zinc-700 rounded-md bg-zinc-900 shadow-xl outline-none
					ui-open="animate-slideDownAndFade"
					ui-closed="animate-slideUpAndFade"
					:side-offset="15"
				>
					<DropdownMenuArrow fill-zinc-700 />
					<DropdownMenuItem
						relative mb-2 flex flex-col select-none px-1 text-sm text-green-600 leading-none outline-none lg:hidden
					>
						<div text-sm text-zinc-100 font-medium leading="[1.5]">
							{{ user!.name }}
						</div>
						<div text-sm text-zinc-400 leading="[1.5]">
							Karma {{ formatNumber(user!.total_karma) }}
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem
						as-child
						relative h-8 flex select-none items-center rounded="3px" px-2 text-sm text-green-600 leading-none outline-none
						class="data-[highlighted]:(bg-green-600 text-zinc-100)"
					>
						<NuxtLink :to="`/${user?.subreddit?.display_name_prefixed}`">
							Profile
						</NuxtLink>
					</DropdownMenuItem>
					<DropdownMenuItem
						as-child
						relative h-8 flex select-none items-center rounded="3px" px-2 text-sm text-green-600 leading-none outline-none
						class="data-[highlighted]:(bg-green-600 text-zinc-100)"
					>
						<NuxtLink to="/settings">
							Settings
						</NuxtLink>
					</DropdownMenuItem>
					<DropdownMenuItem
						as-child
						relative h-8 flex select-none items-center rounded="3px" px-2 text-sm text-red-600 leading-none outline-none
						class="data-[highlighted]:(bg-red-600 text-zinc-100)"
					>
						<button type="button" w-full @click="logout()">
							Logout
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuPortal>
		</DropdownMenuRoot>
	</div>
</template>

<script lang="ts" setup>
	const { logout } = useReddit();
	const { user } = storeToRefs(useRedditStore());
	const { formatNumber, getInitials } = useUtils();
</script>
