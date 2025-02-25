<template>
	<UHeader>
		<template #title>
			<SvgoLogo class="h-6 w-auto" />
		</template>

		<template #default>
			<SiteSearch />
		</template>

		<template #right>
			<UserInfo v-if="user" id="userProfile" />
			<UButton v-else :to="authUrl">
				Login
			</UButton>
		</template>
	</UHeader>
</template>

<script lang="ts" setup>
	const { authUrl, user } = useReddit();
</script>
