<template>
	<div rounded-xl>
		<TreeRoot v-if="props.comments.length"
			v-slot="{ flattenItems }"
			v-model="selectedComments"
			select-none list-none rounded-lg bg-zinc-900 p-2 flex-col space-y-3
			:items="commentList"
			multiple
			:get-key="(item) => item.id"
		>
			<TreeItem
				v-for="(item, index) in flattenItems"
				v-slot="{ isExpanded }"
				:key="item._id"
				:style="{ 'padding-left': `${item.level - 0.5}rem` }"
				v-bind="item.bind"
				@toggle="loadMoreReplies(index)"
				my-1 flex flex-col rounded px-2 py-1 outline-none
				text-zinc-100
			>
				<div flex>
					<template v-if="item.hasChildren">
						<Icon
							v-if="!isExpanded"
							name="heroicons-outline:plus-circle"
							class="size-4 min-w-4 mt-1"
						/>
						<Icon
							v-else
							name="heroicons-outline:minus-circle"
							class="size-4 min-w-4 mt-1"
						/>
					</template>
					<div class="rich-text text-sm pl-2" v-html="item.value.body_html" />
				</div>
			</TreeItem>

			<div v-if="commentList.length < processedComments.length" pb-5 flex-center>
				<button type="button" bg-green-600 hover="bg-green-600/90" py="2.5" text-sm flex-center rounded-md px-4 text-zinc-100 leading-none shadow-md outline-none transition-colors @click="loadMoreComments()">
					Load more
				</button>
			</div>
		</TreeRoot>

		<div v-else rounded-lg bg-zinc-900 p-2 flex-center h-24>
			<p text-sm text-zinc-400 font-medium>No comments yet</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		comments: Comment[]
	}>();

	const { comments } = toRefs(props);

	const commentsChunkSize = 10;
	const repliesChunkSize = 5;

	const handleComments = (comments: Comment[]): Comment[] => {
		return comments.map((comment: Comment) => {
			const { replies, ...properties } = comment;
			return {
				...properties,
				children: replies ? handleComments(replies).slice(0, repliesChunkSize) : undefined
			};
		});
	};

	const processedComments = computed(() => handleComments(comments.value));

	const commentList = ref<Comment[]>(processedComments.value.slice(0, commentsChunkSize));

	const selectedComments = ref<Comment[]>([]);

	const loadMoreComments = () => {
		const currentLength = commentList.value.length;
		const nextChunk = processedComments.value.slice(currentLength, currentLength + commentsChunkSize);
		commentList.value.push(...nextChunk);
	};

	const loadMoreReplies = (commentIndex: number) => {
		const comment = commentList.value[commentIndex];
		const currentLength = comment.children!.length;
		const nextChunk = comment.children!.slice(currentLength, currentLength + repliesChunkSize);
		comment.children.push(...nextChunk);
	};
</script>

<style lang="scss">
	.rich-text {
		h1 {
			@apply text-lg;
		}
		a {
			@apply underline text-accent;
		}
	}
</style>
