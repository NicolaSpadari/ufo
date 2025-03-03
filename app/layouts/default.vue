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

		<template v-else>
			<slot />
		</template>
	</div>
</template>

<script lang="ts" setup>
	const { isAuthenticated } = useReddit();
</script>
