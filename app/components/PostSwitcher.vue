<template>
	<UCard
		variant="subtle"
		:ui="{
			body: 'p-1 sm:p-2'
		}"
	>
		<div class="flex gap-x-2 items-center">
			<UDropdownMenu
				:items="availableOrders"
				:ui="{
					content: 'w-48'
				}"
			>
				<UButton variant="outline">
					Order by: <strong class="capitalize">{{ order }}</strong>
				</UButton>
			</UDropdownMenu>
			<UDropdownMenu
				v-if="order === 'top'"
				:items="availableSorts"
				:ui="{
					content: 'w-48'
				}"
			>
				<UButton variant="outline">
					Sort by: <strong class="capitalize">{{ sort }}</strong>
				</UButton>
			</UDropdownMenu>
		</div>
	</UCard>
</template>

<script lang="ts" setup>
	const { order, sort } = useReddit();

	const availableOrders = [{
		label: "Hot",
		value: "hot",
		icon: "lucide:flame",
		checked: order.value === "hot",
		onSelect() {
			order.value = "hot";
		}
	}, {
		label: "New",
		value: "new",
		icon: "lucide:badge",
		checked: order.value === "new",
		onSelect() {
			order.value = "new";
		}
	}, {
		label: "Top",
		value: "top",
		icon: "lucide:arrow-up",
		checked: order.value === "top",
		onSelect() {
			order.value = "top";
		}
	}, {
		label: "Rising",
		value: "rising",
		icon: "lucide:trending-up",
		checked: order.value === "rising",
		onSelect() {
			order.value = "rising";
		}
	}, {
		label: "Controversial",
		value: "controversial",
		icon: "lucide:shield-question",
		checked: order.value === "controversial",
		onSelect() {
			order.value = "controversial";
		}
	}];

	const availableSorts = [{
		label: "Hour",
		value: "hour",
		icon: "lucide:calendar-clock",
		checked: sort.value === "hour",
		onSelect() {
			sort.value = "hour";
		}
	}, {
		label: "Day",
		value: "day",
		icon: "lucide:calendar-1",
		checked: sort.value === "day",
		onSelect() {
			sort.value = "day";
		}
	}, {
		label: "Week",
		value: "week",
		icon: "lucide:calendar-days",
		checked: sort.value === "week",
		onSelect() {
			sort.value = "week";
		}
	}, {
		label: "Month",
		value: "month",
		icon: "lucide:calendar-range",
		checked: sort.value === "month",
		onSelect() {
			sort.value = "month";
		}
	}, {
		label: "Year",
		value: "year",
		icon: "lucide:calendar",
		checked: sort.value === "year",
		onSelect() {
			sort.value = "year";
		}
	}];
</script>
