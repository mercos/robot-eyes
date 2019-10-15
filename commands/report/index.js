const robotEyesReport = require('robot-eyes-report')
const getFailedTests = require('../../core/getFailedTests')

const report = port => {
  const failedTests = getFailedTests()
  robotEyesReport(failedTests, port)
}

module.exports = report
