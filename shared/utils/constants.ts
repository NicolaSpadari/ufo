export default function () {
	const appName = "UFO";
	const appDescription = "An alternative Reddit client made with Nuxt 3 and NuxtUI";
	const randomString = "ufo_app";
	const batchSize = 15;
	const multiredditBatchSize = 5;
	const productionUrl = "https://ufo.nicolaspadari.dev";
	const methodNameMap = {
		hot: "getHot",
		new: "getNew",
		top: "getTop",
		rising: "getRising",
		controversial: "getControversial"
	};

	return {
		appName,
		appDescription,
		randomString,
		batchSize,
		multiredditBatchSize,
		productionUrl,
		methodNameMap
	};
}
