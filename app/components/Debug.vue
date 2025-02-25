<template>
	<div flex flex-col bg-gray-200 space-y-3>
		<button @click="initializeClient()">
			initializeClient
		</button>
		<button @click="setSubscriptions()">
			setSubscriptions
		</button>
		<button @click="setMultireddits()">
			setMultireddits
		</button>
	</div>
</template>

<script lang="ts" setup>
	const { initializeClient, setSubscriptions, setMultireddits } = useReddit();
</script>
