declare interface Subreddit {
	[key: string]: string
}
declare interface RedditUser {
	[key: string]: string
}
declare interface Submission {
	[key: string]: string
}
declare interface Multireddit {
	[key: string]: string
}
declare interface SubscriptionList {
	favorites: Subreddit[]
	subscriptions: Subreddit[]
	following: Subreddit[]
}

declare interface RawSubreddit {
	kind: string
	data: Subreddit
}

declare interface RedditData<T> {
	children: T[]
	before?: string
	after?: string
	[key: string]: string
}

declare interface RedditResponse<T> {
	kind: string
	data: RedditData<T>
}
