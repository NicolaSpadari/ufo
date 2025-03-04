<template>
	<div>
		{{ message }}
	</div>
</template>

<script lang="ts" setup>
	definePageMeta({
		layout: "blank"
	});

	const route = useRoute();
	const router = useRouter();
	const { randomString } = useConstants();
	const { authorize } = useReddit();
	const message = ref("Loading...");

	if (route.query.state !== randomString) {
		message.value = "Code mismatch";
		throw createError({
			statusCode: 500,
			statusMessage: "Code mismatch"
		});
	}

	const { data } = await useFetch<AuthResponse>("/api/auth", {
		method: "POST",
		body: {
			code: (route.query.code as string)
		}
	});

	useCookie("ufo_access_token", {
		expires: new Date(Date.now() + (data.value?.expires_in ?? 0) * 1000)
	}).value = data.value?.access_token;
	useCookie("ufo_refresh_token", {
		expires: new Date(Date.now() + (data.value?.expires_in ?? 0) * 1000)
	}).value = data.value?.refresh_token;

	const { success } = await authorize(data.value?.access_token);

	if (success) setTimeout(() => router.push("/"), 1000);
</script>
