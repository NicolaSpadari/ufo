<template>
	<Html class="min-h-[100dvh] scroll-smooth overflow-x-hidden">
		<Body class="antialiased font-sans">
			<NuxtPwaManifest />
			<UApp>
				<UMain>
					<NuxtLoadingIndicator />
					<NuxtLayout>
						<NuxtPage />
					</NuxtLayout>
				</UMain>
			</UApp>
		</Body>
	</Html>
</template>
