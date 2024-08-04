<template>
	<DialogPortal>
		<DialogOverlay
			fixed inset-0 z-30 bg-blackA9
			ui-open="animate-overlayShow"
		/>
		<DialogContent
			ui-open="animate-contentShow"
			absolute-center-h
			absolute-center-v
			h="100dvh"
			w="100dvw"
			z-35
			fixed rounded-sm bg-white p-6 shadow="[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]" focus="outline-none"
		>
			<VisuallyHidden>
				<DialogTitle>
					Post
				</DialogTitle>
				<DialogDescription>
					Reddit post
				</DialogDescription>
			</VisuallyHidden>
			<slot />
			<DialogClose
				absolute right-3 top-3 size-8 flex-center appearance-none rounded-full text-grass11 hover="bg-green4"
			>
				<Icon name="lucide:x" size-6 />
			</DialogClose>
		</DialogContent>
	</DialogPortal>
</template>
