import { vite as vidstack } from "vidstack/plugins";
import { appDescription, appName, productionUrl } from "./constants";

export default defineNuxtConfig({
	modules: [
		"@vueuse/nuxt",
		"@nuxt/image",
		"@nuxt/ui-pro",
		"@nuxt/eslint",
		"@vite-pwa/nuxt",
		"@stefanobartoletti/nuxt-social-share",
		"reka-ui/nuxt",
		"nuxt3-date-fns",
		"nuxt-svgo"
	],
	runtimeConfig: {
		public: {
			mdc: {},
			redditClientId: process.env.REDDIT_CLIENT_ID,
			authRedirectUrl: process.env.AUTH_REDIRECT_URL
		},
		redditSecretKey: process.env.REDDIT_SECRET_KEY
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
	pwa: {
		strategies: "generateSW",
		registerType: "autoUpdate",
		base: "/",
		includeAssets: ["favicon.svg"],
		manifest: {
			name: "UFO",
			short_name: "UFO",
			theme_color: "#18181B",
			icons: [
				{
					src: "pwa-64x64.png",
					sizes: "64x64",
					type: "image/png"
				},
				{
					src: "pwa-192x192.png",
					sizes: "192x192",
					type: "image/png"
				},
				{
					src: "pwa-512x512.png",
					sizes: "512x512",
					type: "image/png",
					purpose: "any"
				},
				{
					src: "maskable-icon-512x512.png",
					sizes: "512x512",
					type: "image/png",
					purpose: "maskable"
				}
			]
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
	compatibilityDate: "2025-03-01"
});
