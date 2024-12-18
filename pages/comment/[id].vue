<template>
	<div v-if="user" py-5 space-y-5>
		<Loader v-if="loading" />

		<template v-else>
			<Post from="feed" :post="submission" type="full" />
			<Comments :comments="submission?.comments" />
		</template>
	</div>
</template>

<script lang="ts" setup>
	const route = useRoute();
	const { client } = useReddit();
	const { user } = storeToRefs(useRedditStore());
	const submission = ref<Submission | null>(null);
	const loading = ref(true);

	if (user.value) {
		console.log("call post details");

		client.value!.getSubmission((route.params as RouteParams).id!).fetch().then((res: Submission) => {
			submission.value = res;
			console.log(submission.value);
			loading.value = false;
		});
	}
</script>
