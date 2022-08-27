// const process = require("process");

module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
      },
    "root": true,
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "@typescript-eslint",
        "Prettier"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    "rules": {
     // windows linebreaks when not in production environment
     "linebreak-style": ["error", process.platform === "win32" ? "unix" : "windows"]    }
}