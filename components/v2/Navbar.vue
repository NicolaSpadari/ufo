<template>
	<header class="bg-white shadow">
		<div class="mx-auto max-w-7xl px-2 lg:px-8 sm:px-4 lg:divide-y lg:divide-gray-200">
			<div class="relative h-16 flex justify-between">
				<div class="relative z-10 flex px-2 lg:px-0">
					<button lg="hidden" @click="open = !open">
						<Icon name="heroicons-solid:bars-3" size-6 />
					</button>
					<div class="flex flex-shrink-0 items-center">
						<img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
					</div>
				</div>
				<div class="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
					<div class="w-full sm:max-w-xs">
						<label for="search" class="sr-only">Search</label>
						<div class="relative">
							<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
									<path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
								</svg>
							</div>
							<input id="search" name="search" class="block w-full border-0 rounded-md bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-gray-300 ring-inset sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:ring-2 focus:ring-indigo-600 focus:ring-inset" placeholder="Search" type="search">
						</div>
					</div>
				</div>
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
					<button type="button" class="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						<span class="absolute -inset-1.5" />
						<span class="sr-only">View notifications</span>
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
						</svg>
					</button>

					<!-- Profile dropdown -->
					<div class="relative ml-4 flex-shrink-0">
						<div>
							<button id="user-menu-button" type="button" class="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-expanded="false" aria-haspopup="true">
								<span class="absolute -inset-1.5" />
								<span class="sr-only">Open user menu</span>
								<img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script lang="ts" setup>
	const { open } = useSidebar();
</script>
