<template>
	<div :class="{ 'pointer-events-none': !props.open }" relative z-10>
		<Transition
			enter-active-class="ease-in-out duration-500"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="ease-in-out duration-500"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div v-show="props.open" fixed inset-0 bg="gray-500/50" transition-opacity />
		</Transition>

		<div fixed inset-0 overflow-hidden>
			<div absolute inset-0 overflow-hidden>
				<div pointer-events-none fixed inset-y-0 left-0 max-w-full flex>
					<Transition
						enter-active-class="transform transition ease-in-out duration-500"
						enter-from-class="-translate-x-full"
						enter-to-class="translate-x-0"
						leave-active-class="transform transition ease-in-out duration-500"
						leave-from-class="translate-x-0"
						leave-to-class="-translate-x-full"
					>
						<div v-show="open" pointer-events-auto relative max-w-sm w-screen>
							<div ref="sidebar" h-full flex flex-col bg-raised py-6 shadow-xl scrollbar="~ track-color-transparent thumb-color-neutral-700 rounded">
								<div relative flex-1 px-4 sm="px-6">
									<ul space-y-1>
										<GroupList v-if="favorites.length" title="Favorites" :list="favorites" />
										<GroupList v-if="subscriptions.length" title="Subscriptions" :list="subscriptions" />
									</ul>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		open: boolean
	}>();

	const emit = defineEmits(["close"]);

	const { subscriptions, favorites } = storeToRefs(useRedditStore());
	const sidebar = ref<HTMLElement | null>(null);

	onClickOutside(sidebar, () => emit("close"));
</script>
