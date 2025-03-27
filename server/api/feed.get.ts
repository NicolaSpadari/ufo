export default defineEventHandler(async (event) => {
	const { batchSize } = constants();
	const { isAuthenticated, sort, order, type, after = undefined, subreddit = undefined, user = undefined } = getQuery(event);
	const bearerToken = getCookie(event, "ufo_access_token");
	let feedEndpoint;

	if (type === "subreddit") {
		feedEndpoint = subreddit ? `/${subreddit}/${order}` : `/${order}`;
	}

	if (type === "user") {
		feedEndpoint = user ? `/user/${user}/submitted` : `/${order}`;
	}

	if (isAuthenticated) {
		return await client<RedditResponse<RawSubmission>>(feedEndpoint!, {
			headers: {
				Authorization: `Bearer ${bearerToken}`
			},
			query: {
				limit: batchSize,
				t: sort,
				sort: order,
				...(type === "user" && { sort: order }),
				after,
				sr_detail: 1
			}
		});
	} else {
		return await reddit<RedditResponse<RawSubmission>>(`${feedEndpoint}/.json`, {
			query: {
				limit: batchSize
			}
		});
	}
});
