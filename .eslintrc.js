const RULES = {
  OFF: "off",
  WARN: "warn",
  ERROR: "error",
};
module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["standard", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  ignorePatterns: ["node_modules", "public", "input"],
  rules: {
    semi: RULES.OFF,
    quotes: RULES.OFF,
    "space-before-function-paren": RULES.OFF,
    "comma-dangle": RULES.OFF,
    eqeqeq: RULES.OFF,
  },
};
