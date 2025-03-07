export default defineEventHandler(async (event) => {
	const bearerToken = getCookie(event, "ufo_access_token");
	const { id } = getQuery(event);

	const post = await client<RedditResponse<RawSubmission>>("/api/info", {
		headers: {
			Authorization: `Bearer ${bearerToken}`
		},
		query: {
			id
		}
	});

	return post;
});
