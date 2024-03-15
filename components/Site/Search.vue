<template>
	<form w-full flex flex-center @submit.prevent="search()">
		<div flex flex-col gap-4>
			<input
				v-model="term" placeholder-font="text" placeholder-text="center sm light/60" bg-elevated min-w-sm w-full border-gray-200 rounded-full px-6 py-3 text-neutral-300 outline-none
				type="text"
				placeholder="Find a community or post"
			>
		</div>
	</form>
</template>

<script lang="ts" setup>
	const term = ref("");

	const search = () => {
		console.log("search", term.value);
	};
</script>
