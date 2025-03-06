export default defineEventHandler(async (event) => {
	const { bearerToken, searchTerm } = getQuery(event);

	const results = await client<RedditResponse<RawSubreddit>>("/subreddits/search", {
		headers: {
			Authorization: `Bearer ${bearerToken}`
		},
		query: {
			q: searchTerm,
			limit: 10
		}
	});

	return results?.data?.children || [];
});
