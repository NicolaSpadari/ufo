<template>
	<div h-full flex flex-col gap-y-5 overflow-y-auto p-2 custom-scrollbar>
		<div flex items-center gap-x-2>
			<button
				type="button"
				h="45px" min-h="45px"
				border border-zinc-800 rounded-full bg-zinc-900 px-5 text-green-600 leading-none outline-none transition-colors duration-300 ease-cubic
				hover="bg-zinc-800 border-zinc-700"
			>
				Post
			</button>

			<button
				type="button"
				class="group"
				h="45px" min-h="45px" relative
				border border-zinc-800 rounded-full bg-zinc-900 px-5 text-green-600 leading-none outline-none transition-colors duration-300 ease-cubic
				hover="bg-zinc-800 border-zinc-700"
			>
				<span group-hover="opacity-0" transition-opacity duration-300 ease-cubic>
					Joined
				</span>
				<span group-hover="opacity-100" absolute absolute-center-h text-red-600 opacity-0 transition-opacity duration-300 ease-cubic absolute-center-v>
					Leave
				</span>
			</button>

			<button
				type="button"
				size="45px"
				flex-center border border-zinc-800 rounded-full bg-zinc-900 text-green-600 leading-none outline-none transition-colors duration-300 ease-cubic
				hover="bg-zinc-800 border-zinc-700"
			>
				<Icon name="heroicons-solid:dots-horizontal" size-5 />
			</button>
		</div>

		<div class="subreddit-description" :class="{ 'min-h-45 max-h-45 overflow-y-hidden': !isOpen }" text-sm text-light v-html="activeSubreddit?.description_html" />

		<div flex-center>
			<button
				type="button"
				h="35px" min-h="35px"
				border border-zinc-800 rounded-full bg-zinc-900 px-5 text-sm text-green-600 leading-none outline-none transition-colors duration-300 ease-cubic
				hover="bg-zinc-800 border-zinc-700"
				@click="isOpen = !isOpen"
			>
				Show {{ isOpen ? "less" : "more" }}
			</button>
		</div>

		<div v-if="activeSubreddit" grid grid-cols-2 gap-x-4 md="gap-x-6">
			<div flex flex-col>
				<span text-zinc-100>{{ formatNumber(activeSubreddit?.subscribers) }}</span>
				<span text-sm text-zinc-400>members</span>
			</div>
			<div flex flex-col>
				<span text-zinc-100>{{ formatNumber(activeSubreddit?.active_user_count) }}</span>
				<span text-sm text-zinc-400>online</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const { activeSubreddit } = useReddit();
	const { formatNumber } = useUtils();
	const isOpen = ref(false);
</script>

<style lang="scss" scoped>
	.subreddit-description {
		::v-deep {
			h1, h2, h3, h4, h5, h6 {
				@apply text-green-600;
			}
			ul {
				@apply mb-3
			}
		}
	}
</style>
