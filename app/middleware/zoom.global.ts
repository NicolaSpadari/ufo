export default defineNuxtRouteMiddleware(() => {
	const { modalOpen, activeMedia } = useUI();

	setTimeout(() => {
		activeMedia.value = "";
		modalOpen.value = false;
	}, 250);
});
