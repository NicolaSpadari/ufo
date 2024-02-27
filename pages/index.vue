<template>
	<div class="grid place-content-center">
		<NuxtLink v-if="!user" to="/login">
			Login
		</NuxtLink>

		<div v-else>
			Page
		</div>
	</div>
</template>

<script lang="ts" setup>
	const { user } = useUser();
</script>
