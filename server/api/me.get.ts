export default defineEventHandler(async (event) => {
	const bearerToken = getCookie(event, "ufo_access_token");

	const profile = await authFetch("/me", {
		headers: {
			"Authorization": `Bearer ${bearerToken}`
		}
	});

	return profile;
});
