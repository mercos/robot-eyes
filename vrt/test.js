const buildTest = require('robot-eyes/buildTest')

DEFAULT_OPTIONS = {
    removeSelectors: ['.zEWidget-launcher', '#beamerNotifications']
}
const test = buildTest(DEFAULT_OPTIONS)

describe('Mercos', function () {
    it('Home', function () {
        return test('/', this.test.title, {
            removeSelectors: ['.containerBanner']
        })
    })
})
