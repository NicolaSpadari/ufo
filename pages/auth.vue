<template>
	<div>
		{{ message }}
	</div>
</template>

<script lang="ts" setup>
	const router = useRouter();
	const route = useRoute();
	const { authorize } = useReddit();
	const { randomString } = useConstants();
	const message = ref("Loading...")

	if(route.query.state === randomString){
		authorize(route.query.code as string);
		router.push("/")
	}else{
		message.value = "Code mismatch"
	}
</script>
