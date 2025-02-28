export default defineEventHandler(async (event) => {
	const { sort, after = undefined } = getQuery(event);
	const { batchSize } = constants();
	const bearerToken = getCookie(event, "ufo_access_token");

	const subreddits = await client(`/${sort}`, {
		headers: {
			Authorization: `Bearer ${bearerToken}`
		},
		query: {
			limit: batchSize,
			after
		}
	});

	return subreddits;
});
