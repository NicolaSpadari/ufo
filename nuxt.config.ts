import AutoImport from "unplugin-auto-import/vite";
import { colors } from "@unocss/preset-mini";
import { nodePolyfills } from "vite-plugin-node-polyfills";

const dark800 = typeof colors?.dark === "string" ? colors?.dark : colors?.dark?.[800];

export default defineNuxtConfig({
	modules: [
		"@vueuse/nuxt",
		"@unocss/nuxt",
		"@nuxt/image",
		"@pinia/nuxt",
		"@pinia-plugin-persistedstate/nuxt",
		"nuxt-svgo"
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
				{ name: "description", content: "A Reddit clone" },
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
		"@unocss/reset/tailwind.css"
	],
	svgo: {
		autoImportPath: "./assets/"
	},
	vite: {
		plugins: [
			AutoImport({
				imports: [
					{
						"@/utils/snoowrap": [["reddit", "reddit"]]
					},
					{
						from: "snoowrap",
						imports: ["RedditUser", "Subreddit", "Submission"],
						type: true
					},
					{
						from: "@/utils/snoowrap",
						imports: ["Snoowrap"],
						type: true
					}
				]
			}),
			nodePolyfills()
		]
	},
	vue: {
		compilerOptions: {
			isCustomElement: (tag: string) => tag.startsWith("i-")
		}
	},
	ssr: false,
	sourcemap: {
		server: true,
		client: false
	}
});
