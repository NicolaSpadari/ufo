import { $fetch } from "ofetch";

export const api = $fetch.create({
	baseURL: "https://www.reddit.com/api/v1"
});

export const reddit = $fetch.create({
	baseURL: "https://www.reddit.com"
});

export const client = $fetch.create({
	baseURL: "https://oauth.reddit.com"
});
