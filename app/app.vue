<template>
	<Html class="min-h-[100dvh] scroll-smooth overflow-x-hidden">
		<Body class="antialiased font-sans">
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

<script lang="ts" setup>
	// const { initializeClient, user } = useReddit();

	// if (user?.value) initializeClient();
</script>
