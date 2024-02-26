<template>
	<div class="grid h-screen place-content-center">
		<NuxtLink v-if="!user" to="/login">
			Login
		</NuxtLink>

		<pre v-else>
			{{ feed }}
		</pre>
	</div>
</template>

<script lang="ts" setup>
	const { user } = useUser();
	const { feed, getFeed } = useReddit();

	// if (!feed.value.length) {
	// 	await getFeed();
	// }
</script>
