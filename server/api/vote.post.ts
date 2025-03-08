export default defineEventHandler(async (event) => {
	const bearerToken = getCookie(event, "ufo_access_token");
	const { link, dir } = await readBody(event);

	const result = await client("/api/vote", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${bearerToken}`
		},
		body: {
			link,
			dir
		}
	});

	return result;
});
