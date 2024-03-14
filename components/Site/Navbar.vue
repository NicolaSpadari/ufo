<template>
	<div flex justify-center bg-neutral-200 h-12 space-x-5 py-3>
		<NuxtLink to="/">
			Home
		</NuxtLink>
		<NuxtLink to="/me">
			Me
		</NuxtLink>
		<NuxtLink v-if="!user" :to="authUrl">
			Login
		</NuxtLink>
		<button v-else @click="logout()">
			Logout
		</button>
	</div>
</template>

<script lang="ts" setup>
	const { authUrl, logout } = useReddit();
	const { user } = storeToRefs(useRedditStore());
</script>