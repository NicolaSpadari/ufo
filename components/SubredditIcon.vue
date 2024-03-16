<template>
	<NuxtImg v-if="props.image" :src="props.image" rounded-full :class="{
		'w-6 h-6': props.size === 'small',
		'w-8 h-8': props.size === 'medium',
		'w-20 h-20': props.size === 'big',
	}" />
	<div v-else flex flex-center border-1 border-gray-500 rounded-full bg-light :class="{
		'w-6 h-6': props.size === 'small',
		'w-8 h-8': props.size === 'medium',
		'w-20 h-20': props.size === 'big',
	}">
		<span pointer-events-none text-main :class="{
			'text-sm': props.size === 'small' || props.size === 'medium',
			'text-lg': props.size === 'big',
		}">r/</span>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		image: string
		size: "small" | "medium" | "big"
	}>();
</script>
