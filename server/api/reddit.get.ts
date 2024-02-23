export default defineEventHandler(async (event) => {
	const token = getCookie(event, "token");

	const data = await $fetch("https://oauth.reddit.com/api/v1/me", {
        headers: {
            Authorization: `Bearer ${token}`,
            Content_Type: "application/json",
			Accept: "application/json"
        }
    });

	return data;
});
