<template>
	<div class="grid place-content-center">
		<div v-if="user">
			Logged in as {{ user.name }}
		</div>
	</div>
</template>

<script lang="ts" setup>
	const { user } = storeToRefs(useRedditStore())
</script>