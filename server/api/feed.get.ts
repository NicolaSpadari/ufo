export default defineEventHandler(async (event) => {
	const { batchSize } = constants();
	const { isAuthenticated, sort, order, after = undefined } = getQuery(event);
	const bearerToken = getCookie(event, "ufo_access_token");

	if (isAuthenticated) {
		return await client<RedditResponse<RawSubmission>>(`/${order}`, {
			headers: {
				Authorization: `Bearer ${bearerToken}`
			},
			query: {
				limit: batchSize,
				t: sort,
				after
			}
		});
	} else {
		return await reddit<RedditResponse<RawSubmission>>(".json", {
			query: {
				limit: batchSize
			}
		});
	}
});
