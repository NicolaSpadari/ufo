<template>
	<header id="navbar" sticky top-0 z-15 bg-zinc-900 shadow>
		<div mx-auto max-w-7xl px-2 sm="px-4" lg="px-8 divide-y divide-gray-200">
			<div relative h-16 flex justify-between>
				<div relative z-10 flex gap-3 px-2 lg="px-0">
					<button type="button" lg="hidden" relative flex-shrink-0 rounded-full p-1 text-gray-400 hover="text-gray-500" focus="outline-none ring-2 ring-offset-2 ring-accent" @click="open = !open">
						<Icon name="heroicons-solid:bars-3" size-5 />
					</button>
					<NuxtLink to="/" flex flex-shrink-0 items-center :title="appName">
						<SvgoLogo size-8 text-green-600 :font-controlled="false" />
					</NuxtLink>
				</div>
				<SiteSearch />
				<div relative z-10 flex items-center>
					<UserInfo v-if="user" id="userProfile" />
					<NuxtLink v-else :to="authUrl" hover="bg-green-600" py="2.5" flex-center border border-green-600 rounded-md px-4 text-white leading-none shadow-md outline-none transition-colors>
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
