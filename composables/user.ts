export const useUser = () => {
	const user_profile = useCookie<User | null>("user_profile");
	const user = useState<User | null>("user", () => user_profile.value);

	const setUser = async () => {
		const { data, error } = await useFetch<User>("/api/reddit/me");

		if (!error.value) {
			console.log("setting cookie and ref");
			user.value = data.value;
			user_profile.value = data.value;
		}
	};

	return {
		user,
		setUser
	};
};
