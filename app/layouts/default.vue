<template>
	<div>
		<SiteHeader />

		<UContainer v-if="isAuthenticated">
			<UPage>
				<template #left>
					<UPageAside>
						<SiteSidebar />
					</UPageAside>
				</template>

				<UPageBody>
					<slot />
				</UPageBody>
			</UPage>
		</UContainer>
	</div>
</template>

<script lang="ts" setup>
	const { isAuthenticated } = useReddit();
</script>
