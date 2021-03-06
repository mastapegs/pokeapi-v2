module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'lit', 'prettier'], // prettier always last
  rules: {
    'class-methods-use-this': ['error', { exceptMethods: ['render'] }],
    '@typescript-eslint/explicit-function-return-type': 'error',
    'import/no-unresolved': 'off',
    camelcase: 'off',
    'prettier/prettier': 'error',
  },
};
