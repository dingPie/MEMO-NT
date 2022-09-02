module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},

	root: true,
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "prettier"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
	],

	rules: {
		"linebreak-style": [
			"error",
			process.platform === "win32" ? "windows" : "unix",
		],
		"prettier/prettier": ["error", { endOfLine: "auto" }],
	},
};
