module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    // 'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
