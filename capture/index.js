const getConfig = require('../core/getConfig')
const openBrowser = require('./openBrowser')
const retry = require('../core/retry')
const tryCapture = require('./tryCapture')

const capture = async (url, testName, options = {}) => {
  const config = getConfig()
  const browser = await openBrowser()
  const viewports = config.viewports

  await retry(() => tryCapture(browser, url, testName, viewports, options, config), 3, 500)
}

module.exports = capture
