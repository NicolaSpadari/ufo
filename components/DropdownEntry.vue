<template>
	<NuxtLink :to="props.to" w-full flex rounded-lg px-4 py-2 text-sm cursor-pointer :hover="props.special ? 'bg-red-700/25' : 'bg-light/15'">
		<span ml-auto :class="props.special ? 'text-red-600' : 'text-light'">
			<slot />
		</span>
	</NuxtLink>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		to?: string
		special?: boolean
	}>();
</script>
