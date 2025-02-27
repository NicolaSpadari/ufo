export default defineNuxtRouteMiddleware(() => {
	const accessToken = useCookie("ufo_access_token");

	if (!accessToken.value) {
		console.log("No access token");
		return navigateTo("/test");
	}
});
