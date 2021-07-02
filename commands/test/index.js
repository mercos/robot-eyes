const Mocha = require('mocha')
const fetch = require('node-fetch')
const chalk = require('chalk')

const cleanTestFiles = require('./cleanTestFiles')
const getConfig = require('../../core/getConfig')
const retry = require('../../core/retry')

const ONE_MINUTE_IN_MILLISECONDS = 60000

const waitForResource = url => {
  if (!url) return Promise.resolve()

  return retry(() => fetch(url), {
    timeout: ONE_MINUTE_IN_MILLISECONDS,
    onFailedAttempt: (e, currentAttempt, elapsedMs) => console.log(`Attempt ${currentAttempt} in ${elapsedMs / 1000}s: ${chalk.yellow(e.message)}`)
  })
}

module.exports = (testFileName, grep) => {
  return new Promise((resolve, reject) => {
    const config = getConfig()

    waitForResource(config.baseURL)
      .then(() => {
        try {
          cleanTestFiles()
          const mocha = new Mocha({
            fullTrace: true,
            grep
          })
          mocha.timeout(config.timeout)
          mocha.addFile(testFileName)
          mocha.run(function (failures) {
            failures ? reject(new Error(`${failures} tests failed`)) : resolve()
          })
        } catch (e) {
          reject(e)
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}
