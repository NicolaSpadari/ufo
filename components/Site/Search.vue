<template>
	<div relative w-full flex flex-center>
		<div flex flex-col gap-4>
			<input
				v-model="term" placeholder-font="text" placeholder-text="center sm light/60" min-w-sm w-full border-gray-200 rounded-full bg-elevated px-6 py-3 text-neutral-300 outline-none type="text"
				placeholder="Find a community or post"
				@input="debouncedSearch()"
			>
		</div>

		<Transition>
			<div v-if="results.length" absolute absolute-center-h top="70%" z-10 mt-5 max-w-max w-screen flex px-4>
				<div max-w-lg w-screen flex-auto rounded-lg bg-main text-sm leading-6 shadow-lg ring-1 ring-gray="900/5">
					<div custom-scrollbar max-h-50vh p-4>
						<NuxtLink v-for="subreddit in results" :key="subreddit" :to="`/r/${subreddit}`" class="group" relative flex gap-x-6 rounded-lg p-4 hover="bg-raised">
							<div mt-1 h-11 w-11 flex flex-none items-center justify-center rounded-lg bg-main class="group-hover:bg-raised">
								<div h-8 w-8 rounded-full bg-white />
							</div>
							<span text-light font-semibold>
								{{ subreddit }}
							</span>
						</NuxtLink>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script lang="ts" setup>
	const { client } = useReddit();
	const term = ref("");
	const results = ref<string[]>([]);

	const debouncedSearch = useDebounceFn(() => {
		client.value!.searchSubredditNames({
			query: term.value
		}).then((res) => {
			console.log(res);
			results.value = res;
		});
	}, 1000);
</script>
