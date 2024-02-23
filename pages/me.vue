<template>
	<div>
		<pre>{{ user }}</pre>
	</div>
</template>

<script lang="ts" setup>
	const { user, setUser } = useUser();

	if (!user.value) {
		await setUser();
	}
</script>
