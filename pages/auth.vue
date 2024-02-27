<template>
	<div>
		<div>Loading...</div>
	</div>
</template>

<script lang="ts" setup>
	const { setTokens } = useTokens();
	const { setUser } = useUser();
	const router = useRouter();

	await setTokens();
	await setUser();

	router.push("/me");
</script>
