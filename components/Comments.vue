<template>
	<ul space-y-2 rounded-xl bg-raised p-3 h="30rem" scrollbar="~ track-color-transparent thumb-color-neutral-700 rounded">
		<li v-for="comment in props.comments" :key="comment.id">
			<p text-light font-text text-sm>
				{{ comment.body }}
			</p>

			<ul v-if="comment.replies.length" space-y-2 ml-5>
				<li v-for="reply in comment.replies" :key="reply.id" rounded-xl bg-elevated p-3>
					{{ reply.body }}
				</li>
			</ul>
		</li>
	</ul>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		comments: Comment[]
	}>();
</script>
