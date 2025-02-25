<template>
	<div>
		<SiteHeader />

		<div>
			<LazySiteSidebar />
			<slot />
			<LazySubredditInfo v-if="user && activeSubreddit" />
		</div>
	</div>
</template>

<script lang="ts" setup>
	// const { open } = useSidebar();
	// const { height } = useNavbar();
	const { user, activeSubreddit } = useReddit();
</script>
