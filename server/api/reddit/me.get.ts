export default defineEventHandler(async (event) => {
	const accessToken = getCookie(event, "accessToken");

	console.log("server access token", accessToken);

	const data = await $fetch("https://oauth.reddit.com/api/v1/me", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			Content_Type: "application/json",
			Accept: "application/json"
		}
	});

	return data;
});
