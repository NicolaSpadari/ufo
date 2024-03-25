<template>
	<div relative>
		<button ref="handler" @click="toggleDropdown(props.id)" type="button">
			<slot name="button" />
		</button>

		<Transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
			<div v-show="dropdownIsOpen" ref="dropdown" md="w-10rem" lg="top-12" absolute right-0 top-15 z-5 w-7rem overflow-hidden rounded-xl bg-raised text-sm shadow-md>
				<div flex flex-col>
					<slot name="content" />
				</div>
			</div>
		</Transition>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		id: string
	}>();

	const { isOpen, toggleDropdown, closeDropdown } = useDropdown(props.id);

	const handler = ref<HTMLElement | null>(null);
	const dropdown = ref<HTMLElement | null>(null);

	const dropdownIsOpen = computed(() => isOpen.value.get(props.id));

	onClickOutside(dropdown, () => closeDropdown(props.id), {
		ignore: [handler]
	});
</script>
