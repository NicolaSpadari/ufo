<template>
	<div class="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
		<div class="w-full sm:max-w-xs">
			<div class="relative">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<Icon name="heroicons-outline:search" size-5 text-gray-400 />
				</div>
				<input v-model="term" @input="debouncedSearch()" id="search" name="search" class="block w-full border-0 rounded-full bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-gray-300 ring-inset sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:ring-2 focus:ring-accent focus:ring-inset" placeholder="Search" type="search">
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
	</div>
</template>

<script lang="ts" setup>
	const { client } = useReddit();
	const term = ref("");
	const results = ref<string[]>([]);

	const debouncedSearch = useDebounceFn(() => {
		client.value?.searchSubredditNames({
			query: term.value
		}).then((res) => {
			console.log(res);
			results.value = res;
		});
	}, 1000);
</script>
