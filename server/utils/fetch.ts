import { $fetch } from "ofetch";

export const reddit = $fetch.create({
	baseURL: "https://www.reddit.com/api/v1"
});

export const client = $fetch.create({
	baseURL: "https://oauth.reddit.com"
});
