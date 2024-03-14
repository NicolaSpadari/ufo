<template>
	<div class="grid place-content-center">
		<div v-if="redditStore.user">
			Logged in as {{ redditStore.user.name }}
		</div>
	</div>
</template>

<script lang="ts" setup>
	const redditStore = useRedditStore();
</script>