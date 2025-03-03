<template>
	<div>
		<SiteHeader />

		<UContainer>
			<UPage>
				<template #left>
					<UPageAside v-if="isAuthenticated">
						<SiteSidebar />
					</UPageAside>
				</template>

				<UPageBody>
					<slot />
				</UPageBody>

				<template #right>
					<LazySubredditInfo v-if="isAuthenticated && activeSubreddit" />
				</template>
			</UPage>
		</UContainer>
	</div>
</template>

<script lang="ts" setup>
	const { isAuthenticated, activeSubreddit } = useReddit();
</script>
