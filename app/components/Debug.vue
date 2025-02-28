<template>
	<div>
		<div class="flex gap-3 p-10">
			<UButton @click="authorize()">
				initializeClient
			</UButton>
			<UButton @click="setSubscriptions()">
				setSubscriptions
			</UButton>
			<UButton @click="setMultireddits()">
				setMultireddits
			</UButton>
		</div>

		<pre v-if="subscriptions">{{ subscriptions }}</pre>
	</div>
</template>

<script lang="ts" setup>
	const { authorize, setSubscriptions, setMultireddits, subscriptions } = useReddit();
</script>
