<template>
	<div fixed bottom-0 right-0 flex flex-col space-y-3 bg-gray-200>
		<button @click="initializeClient()">initializeClient</button>
		<button @click="setSubscriptions()">setSubscriptions</button>
	</div>
</template>

<script lang="ts" setup>
	const { initializeClient, setSubscriptions } = useReddit();
</script>