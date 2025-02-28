export default defineEventHandler(async (event) => {
	const { bearerToken } = getQuery(event);

	const subreddits = await client<SubredditsResponse>("/subreddits/mine/subscriber", {
		headers: {
			Authorization: `Bearer ${bearerToken}`
		}
	});

	const favorites = subreddits.data.children.filter((subreddit) => subreddit.data.user_has_favorited).sort((a, b) => a.data.display_name_prefixed.localeCompare(b.data.display_name_prefixed));
	const subscriptions = subreddits.data.children.filter((subreddit) => !subreddit.data.user_has_favorited && subreddit.data.url.includes("/r/")).sort((a, b) => a.data.display_name_prefixed.localeCompare(b.data.display_name_prefixed));
	const following = subreddits.data.children.filter((subreddit) => subreddit.data.url.includes("/user/")).sort((a, b) => a.data.display_name_prefixed.localeCompare(b.data.display_name_prefixed));

	return {
		favorites,
		subscriptions,
		following
	};
});
