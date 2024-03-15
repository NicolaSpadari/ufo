<template>
	<div flex flex-col gap-2 rounded-xl bg-raised p-3>
		<div flex justify-between>
			<div flex items-center gap-3>
				<NuxtImg src="https://via.placeholder.com/12" h-8 w-8 rounded-full />
				<NuxtLink to="/" text-light>
					r/Subreddit
				</NuxtLink>
			</div>
			<button>
				<i-heroicons-solid-ellipsis-horizontal text-light />
			</button>
		</div>
		<div>
			<p text-lg text-light>
				Lorem ipsum dolor sit amet
			</p>
		</div>
		<div overflow-hidden rounded-xl>
			<NuxtImg src="https://via.placeholder.com/480x360" w-full />
		</div>
		<div flex gap-3>
			<div flex items-center gap-2 rounded-full bg-main hover="bg-main/70" p-2 text-sm text-gray-400 shadow-sm>
				<button i-heroicons-solid-chevron-up w-4 h-4 hover="text-orange-500" />
				<span>15</span>
				<button i-heroicons-solid-chevron-down w-4 h-4 hover="text-blue-500" />
			</div>
			<button flex items-center gap-2 px-3 rounded-full bg-main hover="bg-main/70" p-2 text-sm text-gray-400 shadow-sm>
				<i-heroicons-outline-chat-bubble-oval-left w-4 h-4 />
				<span>3</span>
			</button>
			<button flex items-center gap-2 px-3 rounded-full bg-main hover="bg-main/70" p-2 text-sm text-gray-400 shadow-sm>
				<i-heroicons-outline-share w-4 h-4 />
				<span>Share</span>
			</button>
		</div>
	</div>
</template>
