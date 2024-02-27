export const useConstants = () => {
	const appName = "Ufo";
	const authRedirectUrl = "http://localhost:3000/auth";
	const randomString = "ufo_app";

	return {
		appName,
		authRedirectUrl,
		randomString
	};
};
