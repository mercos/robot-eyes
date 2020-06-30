/* eslint-disable mocha/no-nested-tests */
/* eslint-disable mocha/max-top-level-suites */
const buildTest = require('robot-eyes/buildTest')

const DEFAULT_OPTIONS = {
  delay: 1000
}
const test = buildTest(DEFAULT_OPTIONS)

describe('Visualize', function () {
  it('Index', function () {
    return test('/templated-visualize/', this.test.fullTitle())
  })
})

describe('Typify', function () {
  it('Index', function () {
    return test('/templated-typify/', this.test.fullTitle())
  })
})

describe('Retrospect', function () {
  it('Index', function () {
    return test('/templated-retrospect/', this.test.fullTitle())
  })

  it('Elements', function () {
    return test('/templated-retrospect/elements.html', this.test.fullTitle())
  })

  it('Generic', function () {
    return test('/templated-retrospect/generic.html', this.test.fullTitle())
  })
})
