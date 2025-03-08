export default defineEventHandler(async (event) => {
	const bearerToken = getCookie(event, "ufo_access_token");
	const { subreddit } = getQuery(event);

	const infos = await client<RedditResponse<RawSubreddit>>(`/r/${subreddit}/about`, {
		headers: {
			Authorization: `Bearer ${bearerToken}`
		}
	});

	return infos;
});
