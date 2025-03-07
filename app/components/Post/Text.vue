<template>
	<div class="my-3 h-42rem">
		<div class="text-sm text-light font-text" v-html="props.post.selftext_html" />
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		post: Submission
	}>();
</script>
