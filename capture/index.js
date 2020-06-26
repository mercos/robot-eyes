const getConfig = require('../core/getConfig')
const retry = require('../core/retry')
const tryCapture = require('./tryCapture')

const capture = async (url, testName, options = {}) => {
  const config = getConfig()
  const viewports = config.viewports

  await retry(() => tryCapture(url, testName, viewports, options, config), 3, 500)
}

module.exports = capture
