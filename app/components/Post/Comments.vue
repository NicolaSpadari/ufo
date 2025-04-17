<template>
	<UTree :items="commentList" expanded-icon="lucide:circle-minus" collapsed-icon="lucide:circle-plus" />
</template>

<script lang="ts" setup>
	const props = defineProps<{
		comments: Comment[]
	}>();

	console.log(props.comments);

	const commentList = props.comments.map((comment) => {
		return [
			{
				label: comment.body,
				children: [
					{
						label: "some label"
					}
				]
			}
		];
	});
</script>
