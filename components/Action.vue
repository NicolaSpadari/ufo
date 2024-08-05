<template>
	<NuxtLink :to="props.to" flex items-center gap-2 rounded-full cursor-pointer bg-zinc-800 border border-zinc-800 hover="bg-zinc-900" transition-colors py-2 px-3 text-sm text-zinc-400 shadow-sm>
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
