export const useUser = () => {
	const user = useCookie<User | null>("user");

	const setUser = async () => {
		const { data } = await useFetch<User>("/api/reddit/me");
		
		user.value = {
			subreddit: {
				banner_img: data.value?.subreddit.banner_img,
				restrict_posting: data.value?.subreddit.restrict_posting,
				user_is_banned: data.value?.subreddit.user_is_banned,
				community_icon: data.value?.subreddit.community_icon,
				display_name: data.value?.subreddit.display_name,
				header_img: data.value?.subreddit.header_img,
				title: data.value?.subreddit.title,
				coins: data.value?.subreddit.coins,
				over_18: data.value?.subreddit.over_18,
				icon_img: data.value?.subreddit.icon_img,
				description: data.value?.subreddit.description,
				restrict_commenting: data.value?.subreddit.restrict_commenting,
				subscribers: data.value?.subreddit.subscribers,
				display_name_prefixed: data.value?.subreddit.display_name_prefixed,
				name: data.value?.subreddit.name,
				url: data.value?.subreddit.url,
				public_description: data.value?.subreddit.public_description,
				subreddit_type: data.value?.subreddit.subreddit_type,
				user_is_subscriber: data.value?.subreddit.user_is_subscriber
			},
			snoovatar_img: data.value?.snoovatar_img,
			num_friends: data.value?.num_friends,
			verified: data.value?.verified,
			coins: data.value?.coins,
			id: data.value?.id,
			oauth_client_id: data.value?.oauth_client_id,
			over_18: data.value?.over_18,
			icon_img: data.value?.icon_img,
			total_karma: data.value?.total_karma,
			name: data.value?.name,
			gold_creddits: data.value?.gold_creddits,
			linked_identities: data.value?.linked_identities
		};
	};

	const logout = () => {
		const router = useRouter();
		const accessToken = useCookie("accessToken");
		const refreshToken = useCookie("refreshToken");

		user.value = null;
		accessToken.value = null;
		refreshToken.value = null;

		router.push("/");
	}

	return {
		user,
		setUser,
		logout
	};
};
