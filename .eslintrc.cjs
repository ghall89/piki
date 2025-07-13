module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    browser: false,
    node: true,
    es2021: true,
  },
  plugins: ['prettier'],
};
