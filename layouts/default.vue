<template>
	<div w-screen h-screen grid>
		<SiteNavbar />
		
		<div grid grid-cols="12" gap-6 overflow-hidden>
			<LazySiteSidebar col-span-3 />

			<slot />
		</div>
	</div>
</template>
