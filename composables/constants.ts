export const useConstants = () => {
	const appName = "Ufo";
	const authRedirectUrl = "http://localhost:3000/auth";
	const randomString = "ufo_app";
	const allScopes = ["identity", "edit", "flair", "history", "modconfig", "modflair", "modlog", "modposts", "modwiki", "mysubreddits", "privatemessages", "read", "report", "save", "submit", "subscribe", "vote", "wikiedit", "wikiread"];
	const userAgent = "Nicola Spadari - UFO (https://nicolaspadari.dev)";

	return {
		appName,
		authRedirectUrl,
		randomString,
		allScopes,
		userAgent
	};
};
