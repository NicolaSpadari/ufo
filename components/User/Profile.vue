<template>
	<div relative flex>
		<button flex items-center gap-3 @click="openDropdown(props.id)">
			<div relative>
				<NuxtImg h-12 w-12 flex-none rounded-full bg-gray-50 :src="user?.icon_img || 'https://via.placeholder.com/50'" />
				<div w="3.5" h="3.5" top="-0.5" right="-0.5" absolute border-2 border-raised rounded-full bg-accent />
			</div>
			<div flex-auto text-center>
				<p text-sm text-light font-semibold leading-6>
					{{ user?.name }}
				</p>
				<div flex items-center gap-1>
					<div h-3 w-3 flex-center rounded-full bg-accent>
						<i-heroicons-solid-star text-light />
					</div>
					<p text-xs text-accent>
						Karma {{ user?.total_karma }}
					</p>
				</div>
			</div>
		</button>

		<Transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
			<div v-show="dropdownIsOpen" ref="dropdown" absolute end-0 z-10 mt-2 w-48 rounded-b-lg top="125%" bg-raised shadow-lg>
				<div flex flex-col p-2>
					<NuxtLink to="/profile" w-full flex rounded-lg px-4 py-2 text-sm hover="bg-light/15">
						<span ml-auto text-light>Profile</span>
					</NuxtLink>
					<button flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm hover="bg-red-700/25" @click="logout()">
						<span ml-auto text-red-600>Logout</span>
					</button>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		id: string
	}>();

	const { logout } = useReddit();
	const { user } = storeToRefs(useRedditStore());
	const { isOpen, openDropdown, closeDropdown } = useDropdown(props.id);
	const dropdown = ref<HTMLElement | null>(null);
	const dropdownIsOpen = computed(() => isOpen.value.get(props.id));

	onClickOutside(dropdown, () => closeDropdown(props.id));
</script>
