<template>
	<NuxtLink :to="props.to" hover="bg-zinc-900" flex cursor-pointer items-center gap-2 border border-zinc-800 rounded-full bg-zinc-800 px-3 py-2 text-sm text-zinc-400 shadow-sm transition-colors>
		<slot name="left" />
		<slot name="center" />
		<slot name="right" />
	</NuxtLink>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		to?: string
	}>();
</script>
