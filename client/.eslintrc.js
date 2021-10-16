module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/typescript/recommended', 'prettier'],

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'class-methods-use-this': 0,
    'no-shadow': 0,
    'import/no-named-as-default': 0,
    'no-void': 0,
    'no-cond-assign': 0,
    'no-plusplus': 0,
    'no-bitwise': 0,
    'dot-notation': 0,
    'keyword-spacing': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-empty': 0,
    semi: ['error', 'always'],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-use-before-define': 'off',
    'vue/no-mutating-props': 'warn',
    'no-param-reassign': ["error", { "props": false }]
  },

  ignorePatterns: ['vue.config.js', '**/*.mock.*', '**/*.spec.*'],

  overrides: [
    {
      files: ['**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
