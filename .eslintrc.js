module.exports = {
  plugins: [],
  extends: ['airbnb'],
  env: { 'es6': true },
  rules: {
    semi: ['error', 'always'],
    'arrow-body-style': ['error', 'as-needed'],
    'no-console': 'off',
    'max-len': ['error', { code: 100, 'ignorePattern': '<path([\s\S]*?)/>' }],
    'no-multiple-empty-lines':  ['error', { max: 1, maxBOF: 0, maxEOF: 0}],
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    amd : true,
    mocha: true,
    jest: true
  }
};
