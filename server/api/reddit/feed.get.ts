export default defineEventHandler(async (event) => {
	const access_token = getCookie(event, "access_token");

	const data = await $fetch("https://oauth.reddit.com/.json", {
		headers: {
			Authorization: `Bearer ${access_token}`,
			Content_Type: "application/json",
			Accept: "application/json"
		}
	});

	console.log("res", data);

	return data;
});
