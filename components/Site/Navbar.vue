<template>
	<div id="navbar" bg-raised py-3 shadow-lg z-5>
		<div crate>
			<div flex items-center justify-between>
				<div flex flex-grow>
					<NuxtLink to="/">
						<div flex items-center gap-2>
							<SvgoLogo w="16!" h="16!" text-accent />
							<span md="flex" hidden text-2xl text-light tracking-wider font-heading uppercase>
								{{ appName }}
							</span>
						</div>
					</NuxtLink>

					<SiteSearch />
				</div>
				<UserProfile v-if="user" id="userProfile" />
				<NuxtLink v-else :to="authUrl" inline-block border border-accent rounded bg-accent px-12 py-3 text-sm text-light font-medium hover="bg-transparent text-accent" focus="outline-none ring text-accent">
					Login
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const { authUrl } = useReddit();
	const { user } = storeToRefs(useRedditStore());
	const { appName } = useConstants();
</script>
