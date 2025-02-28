export default defineEventHandler(async (event) => {
	const { bearerToken } = getQuery(event);

	const profile = await client("/api/v1/me", {
		headers: {
			Authorization: `Bearer ${bearerToken}`
		}
	});

	return profile;
});
