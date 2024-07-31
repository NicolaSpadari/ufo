<template>
	<div>
		<V2Navbar />
		<div grid grid-cols-1 lg="grid-cols-12" gap-3 p-6>
			<div
				lg="col-span-3 translate-x-0" class="<lg:fixed" relative z-10 transform transition duration-500 ease-in-out
				:class="sidebar ? '' : '-translate-x-full'"
			>
				<div class="h-full flex flex-col overflow-y-auto bg-white">
					<div class="px-4 sm:px-6" lg="hidden">
						<div class="flex items-start justify-between">
							<div class="ml-3 h-7 flex items-center">
								<button type="button" @click="sidebar = !sidebar" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
									<span class="absolute -inset-2.5" />
									<Icon name="heroicons-outline:x-mark" size-8 />
								</button>
							</div>
						</div>
					</div>
					<div class="flex-1 px-4 sm:px-6">
						<V2Sidebar />
					</div>
				</div>
			</div>

			<div lg="col-span-6" border>
				content
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

	const sidebar = ref(false);
</script>

<style>
	body{
		@apply bg-white!;
	}
</style>
