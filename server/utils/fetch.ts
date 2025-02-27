import { $fetch } from "ofetch";

export const redditFetch = $fetch.create({
	baseURL: "https://www.reddit.com/api/v1"
});

export const authFetch = $fetch.create({
	baseURL: "https://oauth.reddit.com/api/v1"
});
