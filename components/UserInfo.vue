<template>
	<div>
		<DropdownMenuRoot>
			<DropdownMenuTrigger>
				<div flex gap-x-2>
					<AvatarRoot bg-blacka3 size-11 flex-center select-none overflow-hidden rounded-full>
						<AvatarImage
							size-full rounded-inherit object-cover
							:src="user?.icon_img || ''"
							:alt="user!.name"
						/>
						<AvatarFallback
							size-full flex-center bg-white text="15px" text-grass11 font-medium leading-1
							:delay-ms="600"
						>
							{{ getInitials(user!.name) }}
						</AvatarFallback>
					</AvatarRoot>
					<div hidden lg="flex flex-col items-start">
						<div text-sm text-mauve12 font-medium leading="[1.5]">
							{{ user!.name }}
						</div>
						<div text-sm text-mauve10 leading="[1.5]">
							Karma {{ formatNumber(user!.total_karma) }}
						</div>
					</div>
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuPortal>
				<DropdownMenuContent
					min-w="220px" rounded-md bg-white p="5px" shadow="[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]" outline-none
					ui-open="animate-slideDownAndFade"
					ui-closed="animate-slideUpAndFade"
					:side-offset="13"
				>
					<DropdownMenuArrow fill-white />
					<DropdownMenuItem
						as-child
						relative h-8 flex select-none items-center rounded="3px" px-1 text-sm text-grass11 leading-none outline-none class="data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[disabled]:text-mauve8 data-[highlighted]:text-green1"
					>
						<NuxtLink :to="`/${user?.subreddit?.display_name_prefixed}`">
							Profile
						</NuxtLink>
					</DropdownMenuItem>
					<DropdownMenuItem
						as-child
						relative h-8 flex select-none items-center rounded="3px" px-1 text-sm text-grass11 leading-none outline-none class="data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[disabled]:text-mauve8 data-[highlighted]:text-green1"
					>
						<NuxtLink to="/settings">
							Settings
						</NuxtLink>
					</DropdownMenuItem>
					<DropdownMenuItem
						as-child
						relative h-8 flex select-none items-center rounded="3px" px-1 text-sm text-red-500 leading-none outline-none class="data-[disabled]:pointer-events-none data-[highlighted]:bg-red-400 data-[disabled]:text-mauve8 data-[highlighted]:text-red1"
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
