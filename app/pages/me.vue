<template>
	<div>
		<ProseH1>Me</ProseH1>

		<pre>{{ data }}</pre>
	</div>
</template>

<script lang="ts" setup>
	definePageMeta({
		middleware: "auth"
	});

	const { data } = await useFetch("/api/me");
</script>
