<template>
	<div flex min-h-screen flex-col>
		<div flex-1>
			<SiteNavbar />
			<div grid grid-cols-4>
				<div col-span-1>
					<LazySiteSidebar />
				</div>
				<div col-span-3>
					<slot />
				</div>
			</div>
		</div>

		<SiteFooter />
	</div>
</template>