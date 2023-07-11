import AutoImport from "unplugin-auto-import/vite";

export default defineNuxtConfig({
	modules: [
		"@vueuse/nuxt",
		"nuxt-headlessui",
		"@nuxthq/ui",
		"@nuxt/image-edge",
		"nuxt-svgo"
	],
	app: {
		head: {
			title: "Ufo",
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			meta: [
				{ name: "theme-color", content: "#ffffff" },
				{ name: "format-detection", content: "no" }
			],
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
	headlessui: {
		prefix: ""
	},
	colorMode: {
		preference: "light"
	},
	svgo: {
		autoImportPath: "./assets/"
	},
	vite: {
		plugins: [
			AutoImport({})
		]
	},
	vue: {
		compilerOptions: {
			isCustomElement: (tag: string) => tag.startsWith("i-")
		}
	},
	nitro: {
		prerender: {
			routes: ["/"]
		}
	},
	sourcemap: {
		server: true,
		client: false
	}
});
