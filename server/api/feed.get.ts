export default defineEventHandler(async (event) => {
	const { batchSize } = constants();
	const { isAuthenticated, sort, order, after = undefined, subreddit = undefined } = getQuery(event);
	const bearerToken = getCookie(event, "ufo_access_token");

	const feedEndpoint = subreddit ? `/${subreddit}/${order}` : `/${order}`;

	console.log(feedEndpoint)

	if (isAuthenticated) {
		return await client<RedditResponse<RawSubmission>>(feedEndpoint, {
			headers: {
				Authorization: `Bearer ${bearerToken}`
			},
			query: {
				limit: batchSize,
				t: sort,
				after,
				sr_detail: 1
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
