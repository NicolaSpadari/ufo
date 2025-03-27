export default defineEventHandler(async (event) => {
	const bearerToken = getCookie(event, "ufo_access_token");
	const { user } = getQuery(event);

	const infos = await client<RedditResponse<RawUser>>(`/user/${user}/about`, {
		headers: {
			Authorization: `Bearer ${bearerToken}`
		}
	});

	return infos;
});
