<template>
	<UHeader>
		<template #title>
			<SvgoLogo class="size-6" :filled="true" :font-controlled="false" />
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
