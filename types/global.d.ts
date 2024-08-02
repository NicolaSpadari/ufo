declare interface RouteParams {
	subreddit?: string
	profile?: string
	id?: string
	name: string
}

declare interface PostInfos {
	title: string
	text: string
	url: string
}

declare type PostOrder = "hot" | "new" | "top" | "rising" | "controversial";

declare type PostSort = "hour" | "day" | "week" | "month" | "year" | "all";
