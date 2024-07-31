<template>
	<AccordionRoot
		w-full py-3 space-y-2
		default-value="item-1"
		type="single"
		:collapsible="true"
	>
		<AccordionItem
			v-for="item in accordionItems"
			:key="item.value"
			overflow-hidden
			:value="item.value"
		>
			<AccordionHeader flex>
				<AccordionTrigger class="group" flex flex-1 cursor-pointer items-center justify-between bg-white px-5 outline-none>
					<span>{{ item.title }}</span>
					<Icon
						name="heroicons:chevron-down"
						transition-transform duration-300 ease class="group-data-[state='open']:rotate-180"
					/>
				</AccordionTrigger>
			</AccordionHeader>
			<AccordionContent class="data-[state='open']:animate-slideDown data-[state='closed']:animate-slideUp" animate-duration="300!" overflow-hidden>
				<div px-5 py-4>
					{{ item.content }}
				</div>
			</AccordionContent>
		</AccordionItem>
	</AccordionRoot>
</template>

<script setup lang="ts">
	const accordionItems = [
		{
			value: "item-1",
			title: "Is it accessible?",
			content: "Yes. It adheres to the WAI-ARIA design pattern."
		},
		{
			value: "item-2",
			title: "Is it unstyled?",
			content: "Yes. It's unstyled by default, giving you freedom over the look and feel."
		},
		{
			value: "item-3",
			title: "Can it be animated?",
			content: "Yes! You can use the transition prop to configure the animation."
		}
	];
</script>
