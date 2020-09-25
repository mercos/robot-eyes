const buildTest = require('robot-eyes/buildTest')

const DEFAULT_OPTIONS = {}
const robotEyes = buildTest(DEFAULT_OPTIONS)

// https://github.com/mercos/robot-eyes#creating-a-test-file
// Read about all available options
describe('robot-eyes', function () {
  it('Home', function () {
    return robotEyes('/', this.test.title)
  })

  it('Contact', function () {
    return robotEyes('/contact.html', this.test.title, {
      delay: 500
    })
  })

  it('About', function () {
    return robotEyes('/about.html', this.test.title, {
      onReady: async page => {
        await page.evaluate(() => {
          document.getElementsByTagName('img')[0].style.transform = 'rotate(-180deg)'
        })
      }
    })
  })
})
