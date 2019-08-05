const Mocha = require('mocha')
const cleanTestFiles = require('./cleanTestFiles')
const getConfig = require('../../core/getConfig')

module.exports = (testFileName, grep) => {
  return new Promise((resolve, reject) => {
    try {
      const config = getConfig()
      cleanTestFiles()
      const mocha = new Mocha({
        fullTrace: true,
        grep
      });
      mocha.timeout(config.timeout);
      mocha.addFile(testFileName)
      mocha.run(function (failures) {
        failures ? reject() : resolve()
      });
    } catch (e) {
      reject(e)
    }
  })
}