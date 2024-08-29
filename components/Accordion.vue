<template>
	<AccordionItem
		v-if="subredditList?.length || multiredditList?.length"
		:value="handle"
		overflow-hidden
		:open="open"
		focus-within="relative z-10"
	>
		<AccordionHeader flex>
			<AccordionTrigger h="45px" flex flex-1 items-center justify-between bg-zinc-900 px-5 text-green-600 leading-none outline-none @click="emit('toggle')">
				<span>{{ title }}</span>
				<Icon
					name="heroicons-solid:chevron-down"
					transition-transform duration-300 ease-cubic
					ui-open="rotate-180"
				/>
			</AccordionTrigger>
		</AccordionHeader>
		<AccordionContent
			overflow-hidden bg-zinc-800 text-zinc-100
			ui-open="animate-slideDown"
			ui-closed="animate-slideUp"
		>
			<ul px-3 pb-3 pt-1 space-y-1>
				<template v-if="subredditList">
					<li v-for="entry in subredditList" :key="entry.name" rounded-md px-2 hover="bg-zinc-900" transition-colors>
						<NuxtLink :to="`/${entry.display_name_prefixed.toLowerCase()}`" flex items-center gap-3 rounded-lg py-2 text-sm text-zinc-100 font-medium>
							<SubredditIcon size="small" :image="getIcon(entry)" :name="entry.display_name_prefixed" />

							<span text-main font-text>
								{{ entry.display_name_prefixed }}
							</span>
						</NuxtLink>
					</li>
				</template>
				<template v-if="multiredditList">
					<li v-for="entry in multiredditList" :key="entry.name" rounded-md px-2 hover="bg-zinc-900" transition-colors>
						<NuxtLink :to="`/m/${entry.name}`" flex items-center gap-3 rounded-lg py-2 text-sm text-zinc-100 font-medium>
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

	const { getIcon } = useUtils();
</script>
