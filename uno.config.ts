import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTagify,
	presetTypography,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup
} from "unocss";

import { presetScrollbar } from "unocss-preset-scrollbar";
import { colors } from "@unocss/preset-mini";

export default defineConfig({
	shortcuts: [
		["crate", "mx-auto px-3 xxl:max-w-1320px"],
		["flex-center", "flex justify-center items-center"],
		["absolute-center-h", "transform translate-x-1/2 right-1/2"]
	],
	presets: [
		presetUno(),
		presetTagify(),
		presetAttributify(),
		presetIcons({
			extraProperties: {
				display: "inline-block",
				"vertical-align": "middle"
			}
		}),
		presetTypography(),
		presetWebFonts({
			fonts: {
				heading: {
					name: "Montserrat",
					weights: ["200", "400", "700"]
				},
				text: "Inter"
			}
		}),
		presetScrollbar()
	],
	theme: {
		colors: {
			accent: typeof colors?.green === "string" ? colors?.green : colors?.green?.[500],
			main: typeof colors?.dark === "string" ? colors?.dark : colors?.dark?.[800],
			raised: typeof colors?.neutral === "string" ? colors?.neutral : colors?.neutral?.[800],
			elevated: typeof colors?.neutral === "string" ? colors?.neutral : colors?.neutral?.[600],
			light: typeof colors?.light === "string" ? colors?.light : colors?.light?.[100]
		},
		breakpoints: {
			sm: "576px",
			md: "768px",
			lg: "992px",
			xl: "1200px",
			xxl: "1400px",
			uw: "2000px"
		}
	},
	transformers: [
		transformerDirectives(),
		transformerVariantGroup()
	]
});
