<template>
	<div flex-center flex-1 px-2 sm="absolute inset-0">
		<ComboboxRoot relative>
			<ComboboxAnchor h="35px" min-w="160px" inline-flex items-center justify-between gap-1 rounded bg-white px-4 text-sm text-grass11 leading-none shadow="[0_2px_10px] blackA2" outline-none lg="min-w-[320px]" md="min-w-[240px]">
				<ComboboxInput
					h-full text-grass11 outline-none selection="bg-grass5" placeholder-mauve8
					placeholder="Search"
					@input="setValue($event);debouncedSearch()"
				/>
				<ComboboxTrigger pointer-events-none>
					<Icon
						name="heroicons-outline:search"
						size-4 text-grass11
					/>
				</ComboboxTrigger>
			</ComboboxAnchor>

			<ComboboxContent v-if="term !== ''" will-change="opacity,transform" class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade" absolute z-10 mt-2 min-w="160px" w-full overflow-hidden rounded bg-white shadow="[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
				<ComboboxViewport p-1>
					<ComboboxEmpty py-2 text-center text-xs text-mauve8 font-medium />

					<ComboboxGroup>
						<ComboboxLabel px-6 text-xs text-mauve11 leading-6>
							Results
						</ComboboxLabel>

						<template v-if="results.length">
							<ComboboxItem
								v-for="(option, index) in results"
								:key="index"
								relative h="25px" w-full flex select-none items-center rounded="3px" pl="25px" pr="35px" text-sm text-grass11 leading-none class="data-[disabled]:pointer-events-none data-[highlighted]:bg-grass9 data-[disabled]:text-mauve8 data-[highlighted]:text-grass1 data-[highlighted]:outline-none"
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
	const results = ref<Subreddit[]>([]);

	const setValue = (event: { target: HTMLInputElement }) => {
		term.value = event.target.value;
	};

	const debouncedSearch = useDebounceFn(() => {
		client.value?.searchSubreddits({
			query: term.value
		}).then((res: Subreddit[]) => {
			results.value = res;
		});
	}, 1000);
</script>
