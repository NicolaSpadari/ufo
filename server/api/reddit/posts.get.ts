export default defineEventHandler(async (event) => {
	const { subreddit } = getQuery(event);
	
	const res = await $fetch(`https://oauth.reddit.com/r/${subreddit}/new.json`, {
		query: {
			limit: 100
		}
	});

	return res;
});
