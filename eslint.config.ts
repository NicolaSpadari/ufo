import { antfu as eslintConfig } from "@antfu/eslint-config";
import format from "eslint-plugin-format";

export default eslintConfig(
	// General
	{
		"typescript": true,
		"vue": true,
		"unocss": true,
		"stylistic": {
			"indent": "tab",
			"quotes": "double"
		},
		"formatters": {
			"css": true
		},
		"rules": {
			"curly": "off",
			"no-console": "off",
			"no-new-func": "off",
			"style/semi": ["error", "always"],
			"style/indent": ["error", "tab"],
			"style/quote-props": ["warn", "as-needed"],
			"style/comma-dangle": ["warn", "never"],
			"style/brace-style": ["warn", "1tbs"],
			"style/arrow-parens": ["error", "always"],
			"vue/block-order": ["error", {
				"order": ["template", "script", "style"]
			}],
			"vue/script-indent": ["error", "tab", {
				"baseIndent": 1
			}],
			"antfu/top-level-function": "off",
			"node/prefer-global/process": ["off"]
		}
	},

	// Vue
	{
		"files": ["**/*.vue"],
		"rules": {
			"style/indent": "off"
		}
	},

	// Style
	{
		"files": ["**/*.css"],
		"languageOptions": {
			"parser": format.parserPlain
		},
		"plugins": {
			format
		},
		"rules": {
			"style/indent": "off",
			"format/prettier": ["error", {
				"parser": "scss",
				"useTabs": true,
				"vueIndentScriptAndStyle": true
			}]
		}
	}
);
