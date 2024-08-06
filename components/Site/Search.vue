<template>
	<div flex-center flex-1 px-2 sm="absolute inset-0">
		<ComboboxRoot relative>
			<ComboboxAnchor h="35px" min-w="160px" inline-flex items-center justify-between gap-1 rounded bg-zinc-800 px-4 text-sm text-green-600 leading-none shadow-xl outline-none lg="min-w-[320px]" md="min-w-[240px]">
				<ComboboxInput
					selection="bg-green-500" size-full bg-zinc-800 text-zinc-400 outline-none placeholder-zinc-400
					placeholder="Search"
					@input="setValue($event);debouncedSearch()"
				/>
				<ComboboxTrigger pointer-events-none>
					<Icon
						name="heroicons-outline:search"
						size-4 text-green-600
					/>
				</ComboboxTrigger>
			</ComboboxAnchor>

			<ComboboxContent
				v-if="term !== ''"
				ui-open="animate-slideDownAndFade"
				ui-closed="animate-slideUpAndFade"
				absolute z-10 mt-2 min-w="160px" w-full overflow-hidden rounded bg-zinc-800 shadow="[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
			>
				<ComboboxViewport p-1>
					<Loader v-show="loading" my-3 />
					<ComboboxEmpty v-show="!loading" py-2 text-center text-xs text-mauve8 font-medium />

					<ComboboxGroup>
						<ComboboxLabel px-6 text-xs text-zinc-400 leading-6>
							Results
						</ComboboxLabel>

						<template v-if="results.length && !loading">
							<ComboboxItem
								v-for="(option, index) in results"
								:key="index"
								relative h="30px" w-full flex select-none items-center rounded="3px" px="25px" text-sm text-green-600 leading-none class="data-[highlighted]:bg-green-600 data-[highlighted]:text-zinc-100"
								:value="option"
								as="button"
								@click="navigateTo(option.url)"
							>
								{{ option.display_name }}
							</ComboboxItem>
						</template>
					</ComboboxGroup>
				</ComboboxViewport>
			</ComboboxContent>
		</ComboboxRoot>
	</div>
</template>

<script lang="ts" setup>
	const { client } = useReddit();
	const term = ref("");
	const loading = ref(false);
	const results = ref<Subreddit[]>([]);

	const setValue = (event: { target: HTMLInputElement }) => {
		term.value = event.target.value;
	};

	const debouncedSearch = useDebounceFn(() => {
		loading.value = true;
		client.value?.searchSubreddits({
			query: term.value
		}).then((res: Subreddit[]) => {
			results.value = res;
			loading.value = false;
		});
	}, 1000);
</script>
