<template>
	<div>
		{{ data.title }}
	</div>
</template>

<script lang="ts" setup>
	const data = await useCache<PostInfos>("/products/1", false, {
		baseURL: "https://dummyjson.com"
	});
</script>
