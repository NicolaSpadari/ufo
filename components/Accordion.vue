<template>
	<AccordionItem
		v-if="subredditList?.length || multiredditList?.length"
		:value="handle"
		overflow-hidden
		:open="open"
		focus-within="relative z-10"
	>
		<AccordionHeader flex>
			<AccordionTrigger @click="emit('toggle')" h="45px" flex flex-1 items-center justify-between bg-white px-5 text-grass11 leading-none shadow="[0_1px_0] mauve6" outline-none hover="bg-mauve2">
				<span>{{ title }}</span>
				<Icon
					name="heroicons:chevron-down"
					ease-cubic transition-transform duration-300
					ui-open="rotate-180"
				/>
			</AccordionTrigger>
		</AccordionHeader>
		<AccordionContent
			overflow-hidden bg-mauve2 text-mauve11
			ui-open="animate-slideDown"
			ui-closed="animate-slideUp"
		>
			<ul px-5 py-4 space-y-1>
				<template v-if="subredditList">
					<li v-for="entry in subredditList" :key="entry.name" rounded-md hover="bg-mauve4">
						<NuxtLink :to="`/${entry.display_name_prefixed.toLowerCase()}`" flex items-center gap-3 rounded-lg py-2 text-sm text-light font-medium hover="bg-light/15">
							<SubredditIcon size="small" :image="entry.icon_img" :name="entry.display_name_prefixed" />

							<span text-main font-text>
								{{ entry.display_name_prefixed }}
							</span>
						</NuxtLink>
					</li>
				</template>
				<template v-if="multiredditList">
					<li v-for="entry in multiredditList" :key="entry.name" rounded-md hover="bg-mauve4">
						<NuxtLink :to="`/m/${entry.name}`" flex items-center gap-3 rounded-lg py-2 text-sm text-light font-medium hover="bg-light/15">
							<SubredditIcon size="small" :image="entry.icon_url" :name="entry.display_name" />

							<span text-main font-text>
								{{ entry.display_name }}
							</span>
						</NuxtLink>
					</li>
				</template>
			</ul>
		</AccordionContent>
	</AccordionItem>
</template>

<script lang="ts" setup>
	defineProps<{
		title: string
		handle: string
		subredditList?: Subreddit[]
		multiredditList?: Multireddit[]
		open: boolean
	}>();

	const emit = defineEmits(["toggle"]);
</script>
