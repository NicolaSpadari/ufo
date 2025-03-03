export default defineEventHandler(async (event) => {
	const { batchSize } = constants();
	const { sort, order, after = undefined } = getQuery(event);
	const bearerToken = getCookie(event, "ufo_access_token");

	const subreddits = await client(`/${order}`, {
		headers: {
			Authorization: `Bearer ${bearerToken}`
		},
		query: {
			limit: batchSize,
			t: sort,
			after
		}
	});

	return subreddits;
});
