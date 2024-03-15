<template>
	<div id="sidebar" flex flex-col justify-between scrollbar="~ track-color-transparent thumb-color-neutral-700 rounded">
		<div v-if="favorites.length || subscriptions.length" bg-raised p-2 m-2 rounded-md>
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

<style scoped>
#sidebar {
	height: calc(100vh - 90px);
}
</style>
