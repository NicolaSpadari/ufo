<template>
	<DialogPortal>
		<DialogOverlay
			fixed inset-0 z-30 bg="zinc-800/80" backdrop-blur-sm
			ui-open="animate-overlayShow"
		/>
		<DialogContent
			ui-open="animate-contentShow"
			h="100dvh" w="100dvw"
			fixed absolute-center-h z-35 p-6 absolute-center-v focus="outline-none"
		>
			<VisuallyHidden>
				<DialogTitle>
					{{ activePost?.subreddit_name_prefixed }}
				</DialogTitle>
				<DialogDescription>
					{{ activePost?.title }}
				</DialogDescription>
			</VisuallyHidden>
			<slot />
			<DialogClose
				absolute right-3 top-3 bg-zinc-800 rounded-full size-8 flex-center appearance-none text-zinc-100
			>
				<Icon name="heroicons-outline:x-mark" size-5 />
			</DialogClose>
		</DialogContent>
	</DialogPortal>
</template>

<script lang="ts" setup>
	const { activePost } = useReddit();
</script>
