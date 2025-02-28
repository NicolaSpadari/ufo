declare interface AuthResponse {
	access_token: string
	token_type: string
	expires_in: number
	scope: string
	refresh_token: string
}

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

declare interface SubredditsResponse {
	data: {
		after: string
		before: string
		children: {
			data: Subreddit
			kind: string
		}[]
		[key: string]: unknown
	}
	kind: string
}

declare interface Subscriptions {
	favorites: Subreddit[]
	subscriptions: Subreddit[]
	following: Subreddit[]
}

declare type PostOrder = "hot" | "new" | "top" | "rising" | "controversial";

declare type PostSort = "hour" | "day" | "week" | "month" | "year" | "all";
