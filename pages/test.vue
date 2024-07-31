<template>
	<div>
		<V2Navbar />
		<div grid grid-cols-1 lg="grid-cols-12" gap-3 p-6>
			<div
				lg="col-span-3 translate-x-0" class="<lg:fixed" relative z-10 transform transition duration-500 ease-in-out
				:class="sidebar ? '' : '-translate-x-full'"
			>
				<div h-full flex flex-col overflow-y-auto bg-white>
					<div px-4 lg="hidden">
						<div flex items-start justify-between>
							<div ml-3 h-7 flex items-center>
								<button type="button" @click="sidebar = !sidebar" relative rounded-md bg-white text-gray-400>
									<Icon name="heroicons-outline:x-mark" size-8 />
								</button>
							</div>
						</div>
					</div>
					<div flex-1 px-4>
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
