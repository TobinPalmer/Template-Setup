module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  extends: [
    'eslint:recommended',
    'strict',
    'strict/es6',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier'],

  env: {
    es2020: true,
    browser: true,
    node: true,
  },

  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        bracketSpacing: true,
        eslintIntegration: true,
        printWidth: 120,
      },
    ],
    'no-process-env': 'off',
    'no-console': 'off',
    'func-style': 'off',
    'id-blacklist': 'off',
  },

  ignorePatterns: ['dist/**/*'],
}
