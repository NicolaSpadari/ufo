export default defineEventHandler(async (event) => {
	const accessToken = getCookie(event, "accessToken");
	const subreddits = [] as DemoSubreddit[];
	const limit = 100;

	const getSubreddits = async (after = "") => {
		const data = await $fetch("https://oauth.reddit.com/subreddits/mine/subscriber", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Content_Type: "application/json",
				Accept: "application/json"
			},
			query: {
				limit,
				after
			}
		});

		subreddits.push(...data.data.children);

		if(data.data.dist === limit){
			await getSubreddits(data.data.children[data.data.children.length - 1].data.name);
		}
	}

	await getSubreddits();

	return subreddits.sort((a, b) => a.data.display_name.localeCompare(b.data.display_name));

	return {
		after: data.data.after,
		before: data.data.before,
		subreddits: data.data.children.map((sr) => {
			return {
				name: sr.data.display_name
			};
		})
	};
});
