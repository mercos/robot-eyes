module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    mocha: true
  },
  extends: [
    'plugin:mocha/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'no-async-promise-executor': 'off',
    'no-unused-expressions': 'off'
  },
  plugins: ['mocha']
}
