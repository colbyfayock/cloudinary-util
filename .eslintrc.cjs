// @ts-check
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "only-warn"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "prettier",
    "next",
  ],
  ignorePatterns: ["**/dist/**", "**/node_modules/**", "**/*js"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": ["ts", "tsx"],
    },
    "import/resolver": {
      typescript: true,
      node: true,
    },
    next: {
      rootDir: ["docs/"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "import/no-cycle": "warn",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { fixStyle: "inline-type-imports" },
    ],
    "@typescript-eslint/no-import-type-side-effects": "warn",
    "import/no-duplicates": ["warn", { "prefer-inline": true }],
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
  },
});
