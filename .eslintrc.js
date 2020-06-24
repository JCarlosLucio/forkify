module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'no-console': 'off',
    'no-undef': 'off',
    'no-param-reassign': ['error', { props: false }],
    // 'import/prefer-default-export': 'off',
    // 'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
