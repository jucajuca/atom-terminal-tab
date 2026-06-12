import globals from "globals";
import pluginJs from "@eslint/js";
import pluginTs from "@typescript-eslint/eslint-plugin";
import parserTs from "@typescript-eslint/parser";

export default [
  pluginJs.configs.recommended,
  {
    files: ["lib/**/*.ts", "lib/**/*.tsx", "spec/**/*.ts", "spec/**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.jasmine,
        ...globals.node,
        atom: "readonly",
        etch: "readonly",
        jest: "readonly"
      },
      parser: parserTs
    },
    plugins: {
      "@typescript-eslint": pluginTs
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-undef": "off",
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single"],
      "semi": ["error", "always"]
    }
  }
];
