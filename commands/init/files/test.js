const buildTest = require('robot-eyes/buildTest')

const DEFAULT_OPTIONS = {}
const robotEyes = buildTest(DEFAULT_OPTIONS)

// https://github.com/mercos/robot-eyes#creating-a-test-file
// Read about all available options
describe('robot-eyes', function () {
  it('Home', function () {
    return robotEyes('/', this.test.title)
  })
})
