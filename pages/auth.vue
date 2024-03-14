<template>
	<div>
		Loading...
	</div>
</template>

<script lang="ts" setup>
	const route = useRoute();
	const { getCredentials } = useSnoowrap();
	const { randomString } = useConstants();

	const reddit = useRedditStore();

	if(route.query.state === randomString){
		getCredentials(route.query.code as string);
	}
</script>
