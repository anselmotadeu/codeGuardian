const globals = require("globals");

module.exports = [
  {
    ignores: ["node_modules/**"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: "module",
      globals: globals.node,
    },
    rules: {
      "no-undef": "off",
    },
  },
];
