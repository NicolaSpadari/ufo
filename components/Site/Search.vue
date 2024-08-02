<template>
	<div class="flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
		<ComboboxRoot
			class="relative"
		>
			<ComboboxAnchor class="h-[35px] min-w-[160px] inline-flex items-center justify-between gap-[5px] rounded bg-white px-[15px] text-[13px] text-grass11 leading-none shadow-[0_2px_10px] shadow-black/10 outline-none lg:min-w-[320px] md:min-w-[240px] hover:bg-mauve3 data-[placeholder]:text-grass9 focus:shadow-[0_0_0_2px] focus:shadow-black">
				<ComboboxInput
					class="h-full text-grass11 outline-none !bg-transparent selection:bg-grass5 placeholder-mauve8"
					placeholder="Search"
					@input="setValue($event);debouncedSearch()"
				/>
				<ComboboxTrigger pointer-events-none>
					<Icon
						name="heroicons-outline:search"
						class="size-4 text-grass11"
					/>
				</ComboboxTrigger>
			</ComboboxAnchor>

			<ComboboxContent v-if="term !== ''" class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade absolute z-10 mt-2 min-w-[160px] w-full overflow-hidden rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
				<ComboboxViewport class="p-[5px]">
					<ComboboxEmpty class="py-2 text-center text-xs text-mauve8 font-medium" />

					<ComboboxGroup>
						<ComboboxLabel class="px-[25px] text-xs text-mauve11 leading-[25px]">
							Results
						</ComboboxLabel>

						<template v-if="results.length">
							<ComboboxItem
								v-for="(option, index) in results"
								:key="index"
								class="relative h-[25px] w-full flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] text-grass11 leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-grass9 data-[disabled]:text-mauve8 data-[highlighted]:text-grass1 data-[highlighted]:outline-none"
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
			console.log("search res:", res);
			results.value = res;
		});
	}, 1000);
</script>
