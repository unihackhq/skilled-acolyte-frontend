module.exports = {
  extends: ['airbnb'],
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  rules: {
    'object-curly-newline': ['error', { consistent: true }],
    'function-paren-newline': ['error', 'consistent'],

    'react/jsx-filename-extension': 0,
    'react/forbid-prop-types': 0,
  },
};
