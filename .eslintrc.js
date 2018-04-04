module.exports = {
  plugins: ['react'],
  extends: ['airbnb'],
  env: { 'es6': true },
  rules: {
    semi: ['error', 'never'],
    'arrow-body-style': ['error', 'as-needed'],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-for': 'off',
    'react/forbid-prop-types': 'off',
    'no-console': 'off',
    'max-len': ['error', { code: 100, 'ignorePattern': '<path([\s\S]*?)/>' }]
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "amd" : true,
    "mocha": true,
    "jest": true
  }
};
