export const useConstants = () => {
	const appName = "Ufo";
	const randomString = "ufo_app";
	const allScopes = ["identity", "edit", "flair", "history", "mysubreddits", "privatemessages", "read", "report", "save", "submit", "subscribe", "vote"];
	const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";
	const batchSize = 15;
	const productionUrl = "https://ufo.nicolaspadari.dev";

	return {
		appName,
		randomString,
		allScopes,
		userAgent,
		batchSize,
		productionUrl
	};
};
