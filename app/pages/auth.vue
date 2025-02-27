<template>
	<div>
		{{ message }}
	</div>
</template>

<script lang="ts" setup>
	const route = useRoute();
	const { randomString } = useConstants();
	const message = ref("Loading...");

	if (route.query.state === randomString) {
		const { data, error } = await useFetch<AuthResponse>("/api/auth", {
			method: "POST",
			body: {
				code: (route.query.code as string)
			}
		});

		if (error.value) {
			message.value = error.value.message;
		} else {
			useCookie("ufo_access_token", {
				maxAge: data.value?.expires_in
			}).value = data.value?.access_token;
			useCookie("ufo_refresh_token", {
				maxAge: data.value?.expires_in
			}).value = data.value?.refresh_token;

			navigateTo("/");
		}
	} else {
		message.value = "Code mismatch";
	}
</script>
