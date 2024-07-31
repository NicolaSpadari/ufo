<template>
	<div>
		<V2Navbar />
		<div grid grid-cols-1 lg="grid-cols-12" gap-3 p-6>
			<div
				lg="col-span-3 translate-x-0" class="<lg:(fixed left-0 top-0 h-[100dvh])" relative z-10 transform transition duration-500 ease-in-out
				:class="open ? '' : '-translate-x-[105%]'"
			>
				<div h-full flex flex-col overflow-y-auto bg-white py-6 lg="shadow-none py-0" shadow-md>
					<div px-4 lg="hidden">
						<div flex items-start justify-between>
							<div ml-3 h-7 flex items-center>
								<button type="button" relative rounded-md bg-white text-gray-400 @click="open = !open">
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

			<div lg="col-span-6">
				content
			</div>
			<div lg="col-span-3">
				other sidebar
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	definePageMeta({
		layout: "blank"
	});

	const { open } = useSidebar();
</script>

<style>
	body{
		@apply bg-white!;
	}
</style>
