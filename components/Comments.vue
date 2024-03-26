<template>
	<div rounded-xl bg-raised>
		<details v-for="comment in props.comments" :key="comment.id" class="rich-text group [&_summary::-webkit-details-marker]:hidden" p-3 space-y-3>
			<summary flex cursor-pointer items-center gap-2>
				<template v-if="comment.replies.length">
					<i-heroicons-outline-minus-circle h-6 min-w-6 w-6 text-neutral-500 hidden class="group-open:flex" />
					<i-heroicons-outline-plus-circle h-6 min-w-6 w-6 flex text-neutral-500 class="group-open:hidden" />
				</template>

				<div text-sm text-gray-300 :class="{ 'ml-8': !comment.replies.length }" v-html="comment.body_html" />
			</summary>

			<Comments v-if="comment.replies.length" :comments="comment.replies" ml-3 />
		</details>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		comments: Comment[]
	}>();
</script>

<style lang="scss">
.rich-text {
	h1 {
		@apply text-lg;
	}
	a {
		@apply underline text-accent;
	}
}
</style>
