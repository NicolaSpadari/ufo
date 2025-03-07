<template>
	<div>
		<SiteHeader />

		<UContainer>
			<UPage>
				<template #left>
					<UPageAside>
						<SiteSidebar v-if="isAuthenticated" />
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
