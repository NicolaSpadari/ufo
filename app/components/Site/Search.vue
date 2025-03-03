<template>
	<div>
		<UInputMenu
			v-model="searchTerm"
			:items="results"
			:loading="status === 'pending'"
			icon="i-lucide-search"
			placeholder="Search for a subreddit"
			@update:search-term="updateQuery"
			@update:model-value="(val) => navigateTo(val!.to)"
		>
			<template #leading="{ modelValue, ui }">
				<UAvatar
					v-if="modelValue"
					v-bind="modelValue.icon"
					:size="ui.leadingAvatarSize()"
					:class="ui.leadingAvatar()"
				/>
			</template>
		</UInputMenu>
	</div>
</template>

<script lang="ts" setup>
	const bearerToken = useCookie("ufo_access_token");
	const { stripParams } = useUtils();

	const searchTerm = ref("");
	const query = ref("");

	const updateQuery = useDebounceFn((val) => {
		query.value = val;
	}, 500);

	const { data: results, status } = await useFetch<Subreddit[]>("/api/search", {
		immediate: false,
		query: {
			bearerToken: bearerToken.value,
			searchTerm: query
		},
		transform: (data) => {
			return data?.map((res) => {
				console.log(res)
				return {
					label: res.data.display_name_prefixed,
					to: res.data.url,
					icon: stripParams(res.data.community_icon)
				}
			}) || [];
		}
	});
</script>
