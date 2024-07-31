<template>
	<div>
		<V2Navbar />
		<div grid grid-cols-1 lg="grid-cols-12" gap-3 p-6>
			<div lg="col-span-3" border>
				<V2Sidebar />
			</div>
			<div lg="col-span-6" border>
				page
			</div>
			<div lg="col-span-3" border>
				other sidebar
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	definePageMeta({
		layout: "blank"
	});
</script>

<style>
	body{
		@apply bg-white!;
	}
</style>
