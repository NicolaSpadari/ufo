<template>
	<div>
		<div>Loading...</div>
	</div>
</template>

<script lang="ts" setup>
	const access_token = useCookie("access_token");
	const refresh_token = useCookie("refresh_token");

	const { authRedirectUrl } = useConstants();
	const router = useRouter();
	const route = useRoute();
	const code = ref("");

	code.value = new URLSearchParams(route.fullPath).get("code")!;

	const { data } = await useFetch("/api/reddit/auth", {
		method: "POST",
		body: {
			code: code.value,
			redirectUrl: authRedirectUrl
		}
	});

	if (data.value?.access_token) {
		access_token.value = data.value.access_token;
		refresh_token.value = data.value.refresh_token;
		router.push({
			path: "/me"
		});
	}
</script>
