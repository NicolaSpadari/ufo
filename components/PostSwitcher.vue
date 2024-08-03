<template>
	<MenubarRoot
		class="flex rounded-md bg-mauve3 p-1 shadow-lg"
	>
		<MenubarMenu value="order">
			<MenubarTrigger
				class="flex-center select-none gap-1 rounded px-3 py-2 text-[13px] text-grass11 leading-none outline-none hover:bg-green4"
				ui-open="bg-green4"
			>
				<span>Order by: </span>
				<span font-semibold>{{ order }}</span>
			</MenubarTrigger>
			<MenubarPortal>
				<MenubarContent
					class="will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)] min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] outline-none"
					align="start"
					:side-offset="5"
					:align-offset="-3"
				>
					<MenubarRadioGroup v-model="order">
						<MenubarRadioItem
							v-for="mode in availableOrders"
							:key="mode"
							class="relative h-[25px] flex pointer select-none items-center rounded-[3px] px-[5px] pl-[20px] text-[13px] text-grass11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[disabled]:text-mauve8 data-[highlighted]:text-green1"
							:value="mode"
						>
							<MenubarItemIndicator v-if="mode === order" class="absolute left-0 w-[20px] inline-flex items-center justify-center">
								<Icon name="heroicons-outline:check" />
							</MenubarItemIndicator>
							<span capitalize>{{ mode }}</span>
						</MenubarRadioItem>
					</MenubarRadioGroup>
				</MenubarContent>
			</MenubarPortal>
		</MenubarMenu>
		<MenubarMenu v-if="order === 'top'" value="sort">
			<MenubarTrigger
				class="flex-center select-none gap-1 rounded px-3 py-2 text-[13px] text-grass11 leading-none outline-none hover:bg-green4"
				ui-open="bg-green4"
			>
				<span>Sort by: </span>
				<span font-semibold>{{ sort }}</span>
			</MenubarTrigger>
			<MenubarPortal>
				<MenubarContent
					class="will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)] min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] outline-none"
					align="start"
					:side-offset="5"
					:align-offset="-3"
				>
					<MenubarRadioGroup v-model="sort">
						<MenubarRadioItem
							v-for="mode in availableSorts"
							:key="mode"
							class="relative h-[25px] flex pointer select-none items-center rounded-[3px] px-[5px] pl-[20px] text-[13px] text-grass11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[disabled]:text-mauve8 data-[highlighted]:text-green1"
							:value="mode"
						>
							<MenubarItemIndicator v-if="mode === sort" class="absolute left-0 w-[20px] inline-flex items-center justify-center">
								<Icon name="heroicons-outline:check" />
							</MenubarItemIndicator>
							<span capitalize>{{ mode }}</span>
						</MenubarRadioItem>
					</MenubarRadioGroup>
				</MenubarContent>
			</MenubarPortal>
		</MenubarMenu>
	</MenubarRoot>
</template>

<script lang="ts" setup>
	const { order, sort } = storeToRefs(useRedditStore());

	const availableOrders = ["hot", "new", "top", "rising", "controversial"] as PostOrder[];
	const availableSorts = ["hour", "day", "week", "month", "year", "all"] as PostSort[];
</script>
