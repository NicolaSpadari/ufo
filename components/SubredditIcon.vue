<template>
	<NuxtImg v-if="props.image" :src="props.image" rounded-full :class="props.size === 'small' ? 'w-6 h-6' : 'w-8 h-8'" />
	<div v-else flex flex-center border-1 border-gray-500 rounded-full bg-light :class="props.size === 'small' ? 'w-6 h-6' : 'w-8 h-8'">
		<span pointer-events-none text-sm text-main>r/</span>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		image: string
		size: "small" | "big"
	}>();
</script>
