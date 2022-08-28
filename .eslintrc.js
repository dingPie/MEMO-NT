module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "Prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],

  rules: {
    "linebreak-style": [
      "error",
      process.platform === "win32" ? "windows" : "unix",
    ],
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
