import antfu from "@antfu/eslint-config";

export default antfu({
  type: "lib",
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },
  ignores: [
    "**/docs/*",
    "**/dist/*",
  ],
}, {
  files: ["**/*.{js,jsx,ts,tsx}"],
  rules: {
    "ts/no-redeclare": "off",
    "ts/consistent-type-definitions": ["error", "type"],
    "object-curly-newline": ["error", {
      multiline: true,
      minProperties: 2,
    }],
    "style/function-paren-newline": [
      "error",
      "multiline-arguments",
    ],
    "no-console": ["warn"],
    "antfu/no-top-level-await": ["off"],
    "perfectionist/sort-imports": [
      "error",
      { tsconfigRootDir: "." },
    ],
    "unicorn/filename-case": ["error", {
      case: "kebabCase",
      ignore: ["README.md"],
    }],
    "no-undef": "off",
    "node/prefer-global/process": ["off"],
    "node/no-process-env": ["error"],
  },
});
