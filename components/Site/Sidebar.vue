<template>
	<div id="sidebar" h-screen flex flex-col justify-between bg-raised>
		<div px-4 py-6>
			<ul space-y-1>
				<!-- <li>
					<a
						href="#"
						class="block rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 font-medium"
					>
						General
					</a>
				</li> -->

				<GroupList v-if="favorites.length" title="Favorites" :list="favorites" />
				<GroupList v-if="subscriptions.length" title="Subscriptions" :list="subscriptions" />
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const { subscriptions, favorites } = storeToRefs(useRedditStore());

	// console.log("subscriptions", subscriptions.value)
</script>
