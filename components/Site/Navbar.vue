<template>
	<div id="navbar" sticky top-0 z-5 bg-raised py-3 shadow-lg>
		<button @click="emit('toggleSidebar')" absolute left-5 absolute-center-v>
			<Icon name="heroicons-solid:bars-3" size-8 text-light />
		</button>
		<div crate>
			<div flex items-center justify-between>
				<div flex flex-grow>
					<NuxtLink to="/">
						<div flex items-center gap-2>
							<SvgoLogo w="16!" h="16!" text-accent />
							<span md="flex" text-2xl text-light tracking-wider font-heading uppercase hidden>
								{{ appName }}
							</span>
						</div>
					</NuxtLink>

					<SiteSearch />
				</div>
				<UserInfo v-if="user" id="userProfile" />
				<NuxtLink v-else :to="authUrl" inline-block border border-accent rounded bg-accent px-12 py-3 text-sm text-light font-medium hover="bg-transparent text-accent" focus="outline-none ring text-accent">
					Login
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const emit = defineEmits(["toggleSidebar"]);

	const { authUrl } = useReddit();
	const { user } = storeToRefs(useRedditStore());
	const { appName } = useConstants();
</script>
