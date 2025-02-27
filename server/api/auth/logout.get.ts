export default defineEventHandler(async (event) => {
	deleteCookie(event, "ufo_access_token");
	deleteCookie(event, "ufo_refresh_token");

	return {
		success: true
	};
});
