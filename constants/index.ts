export const appName = "UFO";

export const appDescription = "An alternative Reddit client made with Nuxt 3 and NuxtUI";

export const randomString = "ufo_app";

export const allScopes = [
	"identity",
	"edit",
	"flair",
	"history",
	"mysubreddits",
	"privatemessages",
	"read",
	"report",
	"save",
	"submit",
	"subscribe",
	"vote"
] as const;

export const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

export const batchSize = 15;

export const multiredditBatchSize = 5;

export const productionUrl = "https://ufo.nicolaspadari.dev";

export const methodNameMap = {
	hot: "getHot",
	new: "getNew",
	top: "getTop",
	rising: "getRising",
	controversial: "getControversial"
} as const;
