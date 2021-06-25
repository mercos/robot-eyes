const Mocha = require('mocha')
const waitOn = require('wait-on')
const cleanTestFiles = require('./cleanTestFiles')
const getConfig = require('../../core/getConfig')

const waitForResource = (config) => {
  return waitOn({
    interval: 1000,
    timeout: 60000,
    resources: [
      config.baseURL
    ]
  })
}

module.exports = (testFileName, grep) => {
  return new Promise((resolve, reject) => {
    try {
      const config = getConfig()

      waitForResource(config)
        .then(function () {
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
        })
        .catch(function (err) {
          reject(err)
        })
    } catch (e) {
      reject(e)
    }
  })
}
