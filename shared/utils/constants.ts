export default function () {
	const appName = "UFO";
	const appDescription = "An alternative Reddit client made with Nuxt 3 and NuxtUI";
	const randomString = "ufo_app";
	const batchSize = 15;
	const multiredditBatchSize = 5;
	const productionUrl = "https://ufo.nicolaspadari.dev";
	const availableOrders = ["hot", "new", "top", "rising", "controversial"] as PostOrder[];
	const availableSorts = ["hour", "day", "week", "month", "year", "all"] as PostSort[];

	return {
		appName,
		appDescription,
		randomString,
		batchSize,
		multiredditBatchSize,
		productionUrl,
		availableOrders,
		availableSorts
	};
}
