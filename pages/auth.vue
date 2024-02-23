<template>
    <div>Loading...</div>
</template>

<script lang="ts" setup>
    import { Buffer } from "buffer/";

    const token = useCookie("token");

    const { redditApiKey, redditSecretKey } = useRuntimeConfig();
    const router = useRouter();
    const route = useRoute();
    const code = ref("");

    const params = new URLSearchParams(route.fullPath);
    code.value = params.get("code");
    const btoa = Buffer.from(`${redditApiKey}:${redditSecretKey}`).toString("base64");

    const { data, error } = await useFetch("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code: code.value,
            redirect_uri: "http://localhost:3000/auth"
        }).toString(),
        headers: {
            "Authorization": `Basic ${Buffer.from(`${btoa}`)}`,
            "content-type": "application/x-www-form-urlencoded"
        }
    });

    console.log("res", data.value);
    console.log("err", error.value);

    if (data.value?.access_token) {
        token.value = data.value.access_token;
        router.push({
            path: "/"
        });
    }
</script>
