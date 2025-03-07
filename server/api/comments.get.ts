export default defineEventHandler(async (event) => {
	const { batchSize } = constants();
	const { id } = getQuery(event);
	const bearerToken = getCookie(event, "ufo_access_token");

	const comments = await client<RedditResponse<RawComment>>("/comments", {
		headers: {
			Authorization: `Bearer ${bearerToken}`
		},
		query: {
			id,
			limit: batchSize,
			depth: batchSize
		}
	});

	return comments;
});
