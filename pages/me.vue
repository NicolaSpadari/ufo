<template>
	<div>
		<pre>user: {{ user }}</pre>
	</div>
</template>

<script lang="ts" setup>
	const { user } = useUser();
</script>
