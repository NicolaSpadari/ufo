import { colors } from "@unocss/preset-mini";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { vite as vidstack } from "vidstack/plugins";
import { useConstants } from "./composables/constants";

const dark800 = typeof colors?.dark === "string" ? colors?.dark : colors?.dark?.[800];
const { productionUrl } = useConstants();

export default defineNuxtConfig({
	modules: [
		"@vueuse/nuxt",
		"@unocss/nuxt",
		"@nuxt/image",
		"@nuxt/icon",
		"@nuxt/eslint",
		"@nuxtjs/fontaine",
		"@pinia/nuxt",
		"@pinia-plugin-persistedstate/nuxt",
		"@stefanobartoletti/nuxt-social-share",
		"radix-vue/nuxt",
		"nuxt3-date-fns",
		"nuxt-svgo"
	],
	extends: [
		"github:NicolaSpadari/nuxt-layers/layer-placeholders",
		"github:NicolaSpadari/nuxt-layers/layer-details",
		"github:NicolaSpadari/nuxt-layers/layer-cache"
	],
	runtimeConfig: {
		public: {
			redditApiKey: process.env.REDDIT_API_KEY,
			redditSecretKey: process.env.REDDIT_SECRET_KEY,
			authRedirectUrl: process.env.AUTH_REDIRECT_URL
		}
	},
	app: {
		head: {
			title: "Ufo",
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			meta: [
				{ name: "description", content: "A Reddit client made with Nuxt 3" },
				{ name: "theme-color", content: dark800 },
				{ name: "format-detection", content: "no" }
			],
			bodyAttrs: {
				class: "font-text"
			},
			link: [
				{ rel: "shortcut-icon", href: "/favicon.svg" }
			],
			noscript: [
				{ children: "JavaScript is required to run this project" }
			]
		}
	},
	experimental: {
		typedPages: true
	},
	css: [
		"@unocss/reset/tailwind.css",
		"vidstack/player/styles/default/theme.css",
		"vidstack/player/styles/default/layouts/video.css"
	],
	svgo: {
		autoImportPath: "./assets/"
	},
	image: {
		provider: "ipx"
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
	ssr: false,
	eslint: {
		config: {
			standalone: false
		}
	},
	compatibilityDate: "2024-08-01"
});
