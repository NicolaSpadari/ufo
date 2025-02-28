<template>
	<div class="flex gap-3 p-10">
		<UButton @click="setSubscriptions(bearerToken!)">
			setSubscriptions
		</UButton>
		<UButton disabled @click="setMultireddits()">
			setMultireddits
		</UButton>
	</div>
</template>

<script lang="ts" setup>
	definePageMeta({
		layout: "empty",
		mini: "auth"
	});
	const { setSubscriptions, setMultireddits } = useReddit();
	const bearerToken = useCookie("ufo_access_token");
</script>
