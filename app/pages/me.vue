<template>
	<div>
		<ProseH1>Me</ProseH1>

		<UButton @click="logout()">
			Logout
		</UButton>

		<pre>{{ data }}</pre>
	</div>
</template>

<script lang="ts" setup>
	definePageMeta({
		middleware: "auth"
	});

	const { data } = await useFetch("/api/me");

	const { logout } = useReddit();
</script>
