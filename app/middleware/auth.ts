export default defineNuxtRouteMiddleware(() => {
	const accessToken = useCookie("ufo_access_token");

	if (!accessToken.value) return navigateTo("/");
});
