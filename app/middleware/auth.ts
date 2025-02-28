export default defineNuxtRouteMiddleware(() => {
	const { isAuthenticated } = useReddit();

	if (!isAuthenticated.value) return navigateTo("/");
});
