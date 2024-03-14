export const useConstants = () => {
	const appName = "Ufo";
	const authRedirectUrl = "http://localhost:3000/auth";
	const randomString = "ufo_app";
	const allScopes = ["identity", "edit", "flair", "history", "mysubreddits", "privatemessages", "read", "report", "save", "submit", "subscribe", "vote"];
	const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";
	const batchSize = 15;

	return {
		appName,
		authRedirectUrl,
		randomString,
		allScopes,
		userAgent,
		batchSize
	};
};
