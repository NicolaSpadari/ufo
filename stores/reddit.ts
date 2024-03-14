export const useRedditStore = defineStore("reddit", () => {
	const someValue = ref("initial");

	return {
		someValue
	}
}, {
	persist: {
		storage: persistedState.localStorage
	}
})