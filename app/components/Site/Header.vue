<template>
	<UHeader>
		<template #title>
			<SvgoLogo class="h-6 w-auto" />
		</template>

		<SiteSearch />

		<template #right>
			<UserInfo v-if="isAuthenticated" />
			<UButton v-else :to="authUrl">
				Login
			</UButton>
		</template>
	</UHeader>
</template>

<script lang="ts" setup>
	const { authUrl, isAuthenticated } = useReddit();
</script>
