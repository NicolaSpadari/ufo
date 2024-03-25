<template>
	<NuxtLink :to="props.to" flex items-center gap-2 rounded-full cursor-pointer bg-main hover="bg-main/70" py-2 px-3 text-sm text-gray-400 shadow-sm>
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
