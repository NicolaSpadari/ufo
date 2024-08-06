<template>
	<div>
		<SiteNavbar />

		<div bg-zinc-800>
			<div lg="grid-cols-12" grid grid-cols-1 gap-3 crate>
				<div
					lg="col-span-3 translate-x-0 sticky top-0" class="<lg:(fixed left-0 z-12 w-xs transform transition duration-500 ease-in-out)"
					:class="open ? '' : '-translate-x-[105%]'"
					:style="{
						top: `${height}px`,
						height: `calc(100dvh - ${height}px)`,
					}"
				>
					<LazySiteSidebar />
				</div>

				<div lg="col-start-4 col-span-6">
					<slot />
				</div>
				<div lg="col-span-3">
					<div
						sticky :style="{
							top: `${height}px`,
							height: `calc(100dvh - ${height}px)`,
						}"
					>
						col
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const { open } = useSidebar();
	const { height } = useNavbar();
</script>
