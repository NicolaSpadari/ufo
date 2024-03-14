<template>
	<div>
		Loading...
	</div>
</template>

<script lang="ts" setup>
	const router = useRouter();
	const route = useRoute();
	const { authorize } = useReddit();
	const { randomString } = useConstants();

	if(route.query.state === randomString){
		authorize(route.query.code as string);
		router.push("/")
	}else{
		alert("Code mismatch")
	}
</script>
