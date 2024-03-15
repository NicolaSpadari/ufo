<template>
	<li>
		<details open class="group [&_summary::-webkit-details-marker]:hidden">
			<summary flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-light hover="bg-light/15">
				<span text-sm font-medium>
					{{ props.title }}
				</span>

				<span shrink-0 transition duration-300 class="group-open:-rotate-180">
					<i-heroicons-solid-chevron-down h-4 w-4 text-light />
				</span>
			</summary>

			<ul mt-2 px-4 space-y-1>
				<li v-for="entry in props.list" :key="entry.name">
					<NuxtLink :to="`/${entry.display_name_prefixed.toLowerCase()}`" block rounded-lg px-4 py-2 text-sm text-light font-medium hover="bg-gray-100 text-gray-700">
						{{ entry.display_name_prefixed }}
					</NuxtLink>
				</li>
			</ul>
		</details>
	</li>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		title: string
		list: Subreddit[]
	}>();
</script>
