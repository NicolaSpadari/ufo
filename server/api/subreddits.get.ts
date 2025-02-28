export default defineEventHandler(async (event) => {
	const { bearerToken, limit = undefined } = getQuery(event);

	const subreddits = await client<SubredditsResponse>("/subreddits/mine/subscriber", {
		headers: {
			Authorization: `Bearer ${bearerToken}`
		},
		query: {
			limit
		}
	});

	const favorites = subreddits.data.children.filter((subreddit) => subreddit.data.user_has_favorited).sort((a, b) => a.data.display_name_prefixed.localeCompare(b.data.display_name_prefixed)).map((subreddit) => subreddit.data);
	const subscriptions = subreddits.data.children.filter((subreddit) => !subreddit.data.user_has_favorited && subreddit.data.url.includes("/r/")).sort((a, b) => a.data.display_name_prefixed.localeCompare(b.data.display_name_prefixed)).map((subreddit) => subreddit.data);
	const following = subreddits.data.children.filter((subreddit) => subreddit.data.url.includes("/user/")).sort((a, b) => a.data.display_name_prefixed.localeCompare(b.data.display_name_prefixed)).map((subreddit) => subreddit.data);

	return {
		favorites,
		subscriptions,
		following
	};
});
