export default defineEventHandler(async (event) => {
	const access_token = getCookie(event, "access_token");

	const data = await $fetch("https://oauth.reddit.com/api/v1/me", {
		headers: {
			Authorization: `Bearer ${access_token}`,
			Content_Type: "application/json",
			Accept: "application/json"
		}
	});

	return data;
});
