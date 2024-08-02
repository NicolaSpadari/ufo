<template>
	<header id="navbar" sticky top-0 z-15 bg-white shadow>
		<div class="mx-auto max-w-7xl px-2 lg:px-8 sm:px-4 lg:divide-y lg:divide-gray-200">
			<div class="relative h-16 flex justify-between">
				<div class="relative z-10 flex gap-3 px-2 lg:px-0">
					<button type="button" lg="hidden" relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover="text-gray-500" focus="outline-none ring-2 ring-offset-2 ring-accent" @click="open = !open">
						<span class="absolute -inset-0.5" />
						<Icon name="heroicons-solid:bars-3" size-5 />
					</button>
					<NuxtLink to="/" flex flex-shrink-0 items-center :title="appName">
						<SvgoLogo size-8 text-accent :font-controlled="false" />
					</NuxtLink>
				</div>
				<SiteSearch />
				<div class="relative z-10 flex items-center lg:hidden">
					<!-- Mobile menu button -->
					<button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false">
						<span class="absolute -inset-0.5" />
						<span class="sr-only">Open menu</span>

						<svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
						</svg>
						<svg class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div class="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
					<UserInfo v-if="user" id="userProfile" />
					<NuxtLink v-else :to="authUrl" hover="bg-accent/90" py="2.5" flex-center rounded-md bg-accent px-4 text-white leading-none shadow-md outline-none transition-colors>
						Login
					</NuxtLink>
				</div>
			</div>
		</div>
	</header>
</template>

<script lang="ts" setup>
	const { open } = useSidebar();
	const { authUrl } = useReddit();
	const { user } = storeToRefs(useRedditStore());
	const { appName } = useConstants();
</script>
