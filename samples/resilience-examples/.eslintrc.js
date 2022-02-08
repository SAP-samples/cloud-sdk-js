module.exports = {
  env: { node: true, jest: true },
  extends: ['@sap-cloud-sdk'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: {
      extends: 'tsconfig.json',
      include: ['**/*.ts'],
      exclude: []
    },
    sourceType: 'module'
  },
  ignorePatterns: [],
  plugins: ['@typescript-eslint', 'header', 'import', 'prettier'],
  rules: {},
  overrides: []
};
