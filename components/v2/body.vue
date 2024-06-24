<template>
	<div>
		{{ data.title }}

		<p>Hello {{ name }}</p>

		<NuxtImg :src="genericPlaceholder" />
	</div>
</template>

<script lang="ts" setup>
	const data = await useCache<PostInfos>("/products/1", true, {
		baseURL: "https://dummyjson.com"
	});

	const { name } = usePersonalDetails();
	const { genericPlaceholder } = usePlaceholder();
</script>
