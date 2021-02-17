module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  plugins: ['prettier'],
  rules: {
    'jsx-a11y/': 0,
    'react/jsx-filename-extension': 0,
    'prettier/prettier': 2,
  },
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
};
