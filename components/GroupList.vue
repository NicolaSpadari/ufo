<template>
	<AccordionItem
		v-if="subredditList?.length || multiredditList?.length"
		:value="handle"
		:open="true"
		class="mt-px overflow-hidden focus-within:relative focus-within:z-10 first:mt-0 first:rounded-t last:rounded-b"
	>
		<AccordionHeader flex>
			<AccordionTrigger class="group h-[45px] flex flex-1 items-center justify-between bg-white px-5 text-[15px] text-grass11 leading-none shadow-[0_1px_0] shadow-mauve6 outline-none hover:bg-mauve2">
				<span>{{ title }}</span>
				<Icon
					name="heroicons:chevron-down"
					transition-transform duration-300 ease="[cubic-bezier(0.87,_0,_0.13,_1)]" class="group-data-[state='open']:rotate-180"
				/>
			</AccordionTrigger>
		</AccordionHeader>
		<AccordionContent class="overflow-hidden bg-mauve2 text-[15px] text-mauve11 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
			<ul px-5 py-4 space-y-1>
				<template v-if="subredditList">
					<li v-for="entry in subredditList" :key="entry.name" rounded-md hover="bg-mauve4">
						<NuxtLink :to="`/${entry.display_name_prefixed.toLowerCase()}`" flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-light font-medium hover="bg-light/15">
							<SubredditIcon :image="entry.icon_img" size="small" />
							<span text-dark-800 font-text>
								{{ entry.display_name_prefixed }}
							</span>
						</NuxtLink>
					</li>
				</template>
				<template v-if="multiredditList">
					<li v-for="entry in multiredditList" :key="entry.name" rounded-md hover="bg-mauve4">
						<NuxtLink :to="`/m/${entry.name}`" flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-light font-medium hover="bg-light/15">
							<SubredditIcon :image="entry.icon_url" size="small" />
							<span text-dark-800 font-text>
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
	}>();
</script>
