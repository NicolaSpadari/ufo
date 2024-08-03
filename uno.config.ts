import {
	defineConfig,
	presetAttributify,
	presetTagify,
	presetTypography,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup
} from "unocss";

import { presetRadixUi } from "unocss-preset-primitives";
import { presetScrollbar } from "unocss-preset-scrollbar";
import { colors } from "@unocss/preset-mini";

import { blackA, grass, green, mauve } from "@radix-ui/colors";

const cubicEasing = "cubic-bezier(0.87, 0, 0.13, 1)";

export default defineConfig({
	shortcuts: [
		["crate", "mx-auto px-3 xxl:max-w-1320px"],
		["pointer", "cursor-pointer"],
		["flex-center", "flex justify-center items-center"],
		["absolute-center-h", "transform translate-x-1/2 right-1/2"],
		["absolute-center-v", "transform -translate-y-1/2 top-1/2"],
		["custom-scrollbar", "scrollbar scrollbar-track-color-raised scrollbar-thumb-color-neutral-700 scrollbar-rounded"]
	],
	presets: [
		presetUno(),
		presetTagify(),
		presetAttributify(),
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
		presetRadixUi(),
		presetScrollbar()
	],
	theme: {
		colors: {
			accent: typeof colors?.green === "string" ? colors?.green : colors?.green?.[500],
			main: typeof colors?.dark === "string" ? colors?.dark : colors?.dark?.[800],
			raised: typeof colors?.neutral === "string" ? colors?.neutral : colors?.neutral?.[800],
			elevated: typeof colors?.neutral === "string" ? colors?.neutral : colors?.neutral?.[600],
			light: typeof colors?.light === "string" ? colors?.light : colors?.light?.[100],
			...blackA,
			...green,
			...grass,
			...mauve
		},
		breakpoints: {
			sm: "576px",
			md: "768px",
			lg: "992px",
			xl: "1200px",
			xxl: "1400px"
		},
		animation: {
			keyframes: {
				slideDown: `{
					from { height: 0 }
					to { height: var(--radix-accordion-content-height) }
				}`,
				slideUp: `{
					from { height: var(--radix-accordion-content-height) }
					to { height: 0 }
				}`,
				slideDownAndFade: `{
					from { opacity: 0; transform: translateY(-2px) }
					to { opacity: 1; transform: translateY(0) }
				}`,
				slideUpAndFade: `{
					from { opacity: 1; transform: translateY(0) }
					to { opacity: 0; transform: translateY(-2px) }
				}`
			},
			durations: {
				slideDown: "300ms",
				slideUp: "300ms",
				slideDownAndFade: "300ms",
				slideUpAndFade: "300ms"
			},
			timingFns: {
				slideDown: cubicEasing,
				slideUp: cubicEasing,
				slideDownAndFade: cubicEasing,
				slideUpAndFade: cubicEasing
			},
			counts: {
				slideDown: 1,
				slideUp: 1,
				slideDownAndFade: 1,
				slideUpAndFade: 1
			}
		},
		easing: {
			cubic: cubicEasing
		}
	},
	transformers: [
		transformerDirectives(),
		transformerVariantGroup()
	]
});
