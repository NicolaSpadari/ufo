<template>
	<div>
		<SiteNavbar @toggleSidebar="sidebarOpen = !sidebarOpen" />

		<LazySiteSidebar :open="sidebarOpen" @close="sidebarOpen = false" />

		<div crate>
			<div max-w="850px" mx-auto>
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const sidebarOpen = ref(false);
</script>
