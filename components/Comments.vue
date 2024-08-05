<template>
	<div rounded-xl>
		<TreeRoot
			v-slot="{ flattenItems }"
			v-model="selectedComments"
			class="select-none list-none rounded-lg bg-white p-2 text-sm text-blackA11 font-medium"
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
				class="my-0.5 flex flex-col rounded px-2 py-1 outline-none data-[expanded]:bg-grass4 focus:ring-2 focus:ring-grass8"
			>
				<div flex items-center>
					<template v-if="item.hasChildren">
						<Icon
							v-if="!isExpanded"
							name="heroicons-outline:plus-circle"
							class="size-4 min-w-4"
						/>
						<Icon
							v-else
							name="heroicons-outline:minus-circle"
							class="size-4 min-w-4"
						/>
					</template>
					<div class="rich-text pl-2" v-html="item.value.body_html" />
				</div>
			</TreeItem>

			<div v-if="commentList.length < processedComments.length" mt-3 flex-center>
				<button type="button" hover="bg-accent/90" py="2.5" flex-center rounded-md bg-accent px-4 text-white leading-none shadow-md outline-none transition-colors @click="loadMoreComments()">
					Load more
				</button>
			</div>
		</TreeRoot>
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
