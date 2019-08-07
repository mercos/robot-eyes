const test = require('./test')

const buildTest = defaultOptions =>
  (url, title, options) => test(url, title, options, defaultOptions)

module.exports = buildTest