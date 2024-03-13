export const useStore = defineStore("reddit", () => {
	const someValue = ref("initial");

	return {
		someValue
	}
}, {
	persist: {
		storage: persistedState.localStorage
	}
})