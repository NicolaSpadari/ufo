import { vite as vidstack } from "vidstack/plugins";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { appDescription, appName, productionUrl } from "./constants";

export default defineNuxtConfig({
	modules: [
		"@vueuse/nuxt",
		"@nuxt/image",
		"@nuxt/ui-pro",
		"@nuxt/eslint",
		"@stefanobartoletti/nuxt-social-share",
		"reka-ui/nuxt",
		"nuxt3-date-fns",
		"nuxt-svgo"
	],
	// ssr: false,
	runtimeConfig: {
		public: {
			mdc: {},
			redditApiKey: process.env.REDDIT_API_KEY,
			redditSecretKey: process.env.REDDIT_SECRET_KEY,
			authRedirectUrl: process.env.AUTH_REDIRECT_URL
		},
		redditClientId: process.env.REDDIT_API_KEY,
		redditSecretKey: process.env.REDDIT_SECRET_KEY,
		authRedirectUrl: process.env.AUTH_REDIRECT_URL
	},
	app: {
		head: {
			title: appName,
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			meta: [
				{ name: "description", content: appDescription },
				{ name: "format-detection", content: "no" }
			],
			noscript: [
				{ children: "JavaScript is required to run this project" }
			]
		},
		pageTransition: {
			name: "page",
			mode: "out-in"
		},
		layoutTransition: {
			name: "layout",
			mode: "out-in"
		}
	},
	uiPro: {
		mdc: true,
		content: true
	},
	css: [
		"@/assets/css/main.css",
		"vidstack/player/styles/default/theme.css",
		"vidstack/player/styles/default/layouts/video.css"
	],
	svgo: {
		autoImportPath: "@/assets/"
	},
	image: {
		domains: [
			"reddit.com",
			"reddit.it",
			"redditmedia.com",
			"i.redd.it",
			"preview.redd.it"
		]
	},
	icon: {
		mode: "svg"
	},
	socialShare: {
		baseUrl: productionUrl
	},
	imports: {
		presets: [
			{
				from: "vue-router",
				imports: ["RouteParams"],
				type: true
			},
			{
				from: "snoowrap",
				imports: [
					{
						name: "default",
						as: "Reddit"
					}
				]
			},
			{
				from: "snoowrap",
				imports: ["RedditUser", "Subreddit", "Submission", "MultiReddit"],
				type: true
			},
			{
				from: "snoowrap",
				imports: ["Snoowrap"],
				type: true
			},
			{
				from: "vidstack/elements",
				imports: ["MediaPlayerElement"],
				type: true
			}
		]
	},
	vue: {
		compilerOptions: {
			isCustomElement: (tag: string) => {
				return tag.startsWith("media-");
			}
		}
	},
	vite: {
		plugins: [
			nodePolyfills(),
			vidstack()
		]
	},
	router: {
		options: {
			scrollBehaviorType: "smooth"
		}
	},
	$development: {
		devtools: {
			enabled: true
		}
	},
	experimental: {
		typedPages: true
	},
	eslint: {
		config: {
			standalone: false
		}
	},
	future: {
		compatibilityVersion: 4
	},
	compatibilityDate: "2025-02-01"
});
