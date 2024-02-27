<template>
	<div flex flex-row justify-center bg-neutral-200 space-x-5 sticky top-0 inset-x-0 py-3>
		<NuxtLink to="/">
			Home
		</NuxtLink>
		<NuxtLink to="/me">
			Me
		</NuxtLink>
		<NuxtLink v-if="!user" to="/login">
			Login
		</NuxtLink>
		<button v-else @click="logout()">
			Logout
		</button>
	</div>
</template>

<script lang="ts" setup>
	const { user, logout } = useUser();
</script>