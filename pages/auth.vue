<template>
	<div>
		<button v-if="code" @click="getCredentials(code)">get credentials</button>

		<p v-else>No code provided</p>
	</div>
</template>

<script lang="ts" setup>
	const code = ref("");
	const route = useRoute();
	const { getCredentials } = useSnoowrap();
	
	code.value = new URLSearchParams(route.fullPath).get("code")!;

	// const { setTokens } = useTokens();
	// const { setUser } = useUser();
	// const router = useRouter();

	// await setTokens();
	// await setUser();

	// router.push("/me");
</script>
