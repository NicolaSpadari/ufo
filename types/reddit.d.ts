// Generic interfaces
declare interface Subreddit {
	[key: string]: any
}
declare interface RedditUser {
	[key: string]: any
}
declare interface Submission {
	[key: string]: any
}
declare interface Multireddit {
	[key: string]: any
}

// Raw interfaces
declare interface RawSubreddit {
	kind: string
	data: Subreddit
}
declare interface RawSubmission {
	kind: string
	data: Submission
}

// API responses
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

// Application interfaces
declare interface SubscriptionList {
	favorites: Subreddit[]
	subscriptions: Subreddit[]
	following: Subreddit[]
}
