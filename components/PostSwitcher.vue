<template>
	<MenubarRoot flex rounded-md bg-zinc-900 p-1 shadow-lg>
		<MenubarMenu value="order">
			<MenubarTrigger
				flex-center select-none gap-1 rounded px-3 py-2 text-sm text-green-600 leading-none outline-none hover="bg-zinc-800" transition-colors
				ui-open="bg-zinc-800"
			>
				<span>Order by: </span>
				<span font-semibold capitalize>{{ order }}</span>
			</MenubarTrigger>
			<MenubarPortal>
				<MenubarContent
					ui-open="animate-slideDownAndFade"
					ui-closed="animate-slideUpAndFade"
					will-change="transform,opacity" min-w="220px" rounded-md bg-zinc-900 p-1 shadow-xl outline-none
					align="start"
					:side-offset="5"
					:align-offset="-3"
				>
					<MenubarRadioGroup v-model="order">
						<MenubarRadioItem
							v-for="mode in availableOrders"
							:key="mode"
							relative h="30px" flex pointer select-none items-center rounded="3px" pl="25px" text-sm text-green-600 leading-none outline-none class="data-[highlighted]:(bg-green-600 text-zinc-100)"
							:value="mode"
						>
							<MenubarItemIndicator
								v-if="mode === order"
								absolute left="3px" w="20px" flex-center
							>
								<Icon name="heroicons-solid:check" />
							</MenubarItemIndicator>
							<span capitalize>{{ mode }}</span>
						</MenubarRadioItem>
					</MenubarRadioGroup>
				</MenubarContent>
			</MenubarPortal>
		</MenubarMenu>
		<MenubarMenu v-if="order === 'top'" value="sort">
			<MenubarTrigger
				flex-center select-none gap-1 rounded px-3 py-2 text-sm text-green-600 leading-none outline-none hover="bg-zinc-800" transition-colors
				ui-open="bg-zinc-800"
			>
				<span>Sort by: </span>
				<span font-semibold capitalize>{{ sort }}</span>
			</MenubarTrigger>
			<MenubarPortal>
				<MenubarContent
					ui-open="animate-slideDownAndFade"
					ui-closed="animate-slideUpAndFade"
					will-change="transform,opacity" min-w="220px" rounded-md bg-zinc-900 p-1 shadow-xl outline-none
					align="start"
					:side-offset="5"
					:align-offset="-3"
				>
					<MenubarRadioGroup v-model="sort">
						<MenubarRadioItem
							v-for="mode in availableSorts"
							:key="mode"
							relative h="30px" flex pointer select-none items-center rounded="3px" pl="25px" text-sm text-green-600 leading-none outline-none class="data-[highlighted]:(bg-green-600 text-zinc-100)"
							:value="mode"
						>
							<MenubarItemIndicator
								v-if="mode === sort"
								absolute left="3px" w="20px" flex-center
							>
								<Icon name="heroicons-solid:check" />
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
