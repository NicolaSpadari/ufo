export const useTokens = () => {
	const accessToken = useCookie("accessToken");
	const refreshToken = useCookie("refreshToken");

	const setTokens = async () => {
		const code = ref("");
		const { authRedirectUrl } = useConstants();
		const route = useRoute();

		code.value = new URLSearchParams(route.fullPath).get("code")!;

		const { data } = await useFetch("/api/reddit/auth", {
			method: "POST",
			body: {
				code: code.value,
				redirectUrl: authRedirectUrl
			}
		});

		if (data.value?.access_token) {
			accessToken.value = data.value.access_token;
			refreshToken.value = data.value.refresh_token;
		}
	};

	return {
		accessToken,
		refreshToken,
		setTokens
	};
};
