<template>
	<div>
		<p text-center>Subreddit: {{ $route.params.subreddit }}</p>

		<ul v-if="data?.data.children" space-y-8>
			<li v-for="post in data.data.children" :key="post.data.id">
				<p>{{ post.data.title }}</p>

				<div v-if="post.data.preview?.enabled">
					<NuxtImg :src="post.data.preview.images[0].source.url"/>
				</div>

				<details>
					<summary cursor-pointer>debug:</summary>
					<pre text-sm>
						{{ post }}
					</pre>
				</details>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
	const route = useRoute();
	const { data } = await useFetch("/api/reddit/posts", {
		query: {
			subreddit: route.params.subreddit
		}
	})
	
	console.log("res", data.value)
</script>