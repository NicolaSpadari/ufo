<template>
	<MediaSwitcher v-if="activePost" :key="activePost.id" :post="activePost" />
</template>

<script lang="ts" setup>
	const { activePost } = useReddit();
</script>
