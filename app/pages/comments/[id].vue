<template>
	<div py-5 space-y-5>
		<PostCard v-if="submission" from="feed" :post="submission" type="full" />
		<PostComments v-if="comments?.length" :comments="comments" />
	</div>
</template>

<script lang="ts" setup>
	const route = useRoute();
	const postFullId = (route.params as RouteParams<"comments-id">).id;
	const postId = postFullId.replace("t3_", "");

	const { data: submission } = await useFetch("/api/submission", {
		query: {
			id: postFullId
		},
		transform: (post: RedditResponse<RawSubmission>) => {
			return post.data.children[0]?.data || null;
		}
	});
	console.log(submission);

	const { data: comments } = await useFetch("/api/comments", {
		query: {
			id: postId
		},
		transform: (post: RedditResponse<RawComment>) => {
			return post.data.children.map((comment) => comment.data) || [];
		}
	});
</script>
