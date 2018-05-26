module.exports = {
  extends: ['airbnb'],
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  rules: {
    'object-curly-newline': ['error', {
      ObjectExpression: { consistent: true },
      ObjectPattern: { consistent: true },
      ImportDeclaration: { consistent: true },
      ExportDeclaration: { consistent: true },
    }],

    'react/jsx-filename-extension': 0,
    'react/forbid-prop-types': 0,
  },
};
