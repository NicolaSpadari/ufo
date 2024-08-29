<template>
	<AvatarRoot
		:class="{
			'size-6 min-w-6': size === 'small',
			'size-8 min-w-8': size === 'medium',
			'size-20 min-w-20': size === 'big',
		}"
		bg-blacka3 flex-center select-none overflow-hidden rounded-full align-middle
	>
		<AvatarImage
			:class="{
				'size-6': size === 'small',
				'size-8': size === 'medium',
				'size-20': size === 'big',
			}"
			rounded-inherit object-cover
			:src="image || ''"
			:alt="name"
		/>
		<AvatarFallback
			:class="{
				'size-6': size === 'small',
				'size-8': size === 'medium',
				'size-20': size === 'big',
			}"
			flex-center bg-zinc-900 text-sm text-zinc-100 font-medium leading-1
			:delay-ms="600"
		>
			r/
		</AvatarFallback>
	</AvatarRoot>
</template>

<script lang="ts" setup>
	defineProps<{
		image?: string
		name?: string
		size: "small" | "medium" | "big"
	}>();
</script>
