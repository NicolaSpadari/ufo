<template>
	<div>
		<p text-center>Subreddit: {{ $route.params.subreddit }}</p>

		<div v-if="posts.length" space-y-4>
			<div v-for="post in posts" :key="post.name">
				<details>
					<summary>{{ post.title }}</summary>

					<pre>
						{{ post }}
					</pre>
				</details>

				<p>{{ post.title }}</p>

				<!-- <NuxtImg v-if="post.thumbnail" :src="post.preview.images[0].resolutions[post.preview.images[0].resolutions.length-1].url" /> -->
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const route = useRoute();
	const { client } = useReddit();
	const posts = ref<any[]>([]);

	client.value.getNew(route.params.subreddit).then(result => posts.value = result);
</script>
