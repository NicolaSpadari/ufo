<template>
	<div grid auto-rows-max h-screen w-screen>
		<SiteNavbar />

		<div grid grid-cols="12" overflow-hidden>
			<LazySiteSidebar col-span-3 />

			<div col-span-9 p-6>
				<slot />
			</div>
		</div>
	</div>
</template>
