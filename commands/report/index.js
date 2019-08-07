const robotEyesReport = require('robot-eyes-report')
const getFailedTests = require('../../core/getFailedTests')

const report = () => {
  const failedTests = getFailedTests()
  robotEyesReport(failedTests)
}

module.exports = report