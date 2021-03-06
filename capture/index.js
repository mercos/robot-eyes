const getConfig = require('../core/getConfig')
const retry = require('../core/retry')
const tryCapture = require('./tryCapture')

const capture = async (url, testName, options = {}) => {
  const config = getConfig()

  await retry(() => tryCapture(url, testName, options, config), { attempts: 3, delay: 500 })
}

module.exports = capture
