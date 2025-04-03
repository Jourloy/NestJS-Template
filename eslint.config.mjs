// @ts-check
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: ["eslint.config.mjs"],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	eslintPluginPrettierRecommended,
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
			ecmaVersion: 5,
			sourceType: "module",
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		rules: {
			"indent": [
				"error",
				"tab",
				{
					SwitchCase: 1,
					MemberExpression: 1,
					ignoredNodes: [
						"FunctionExpression > .params[decorators.length > 0]",
						"FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
						"ClassBody.body > PropertyDefinition[decorators.length > 0] > .key",
					],
				},
			],
			"linebreak-style": ["error", "unix"],
			"quotes": ["warn", "double"],
			"semi": ["warn", "always"],
			"no-console": "warn",
			"no-compare-neg-zero": 1,
			"no-dupe-args": "error",
			"no-dupe-else-if": "error",
			"no-unreachable": "error",
			"arrow-body-style": ["error", "as-needed"],
			"camelcase": "error",
			"eqeqeq": ["error", "smart"],
			"multiline-comment-style": ["warn", "starred-block"],
			"no-confusing-arrow": "error",
			"no-else-return": "error",
			"no-empty": "error",
			"no-lonely-if": "error",
			"no-useless-escape": "warn",
			"no-useless-return": "error",
			"no-var": "warn",
			"spaced-comment": ["warn", "always"],
			"array-bracket-spacing": ["warn", "never"],
			"arrow-spacing": ["error", {before: true, after: true}],
			"block-spacing": ["error", "always"],
			"no-multi-spaces": "error",
			"no-multiple-empty-lines": "error",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-floating-promises": "error",
			"@typescript-eslint/no-unsafe-argument": "warn",
		},
	}
);
