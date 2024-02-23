declare interface RedditToken {
	"access_token": string
	"token_type": "bearer"
	"expires_in": number
	"scope": string
	"refresh_token": string
}

declare interface User {
	id: string
	name: string
}
