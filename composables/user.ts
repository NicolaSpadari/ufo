export const useUser = () => {
	const user = useState<User | null>("user", () => null);

	const setUser = async () => {
		const { data, error } = await useFetch<User>("/api/reddit");

		if (!error.value)
			user.value = data.value;
	};

	return {
		user,
		setUser
	};
};
