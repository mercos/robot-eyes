const robotEyesTest = require('robot-eyes/test')

describe('Templates', function () {
  it('Visualize', function () {
    return robotEyesTest('/templated-visualize/', this.test.title, {
      delay: 1000
    })
  })

  it('Typify', function () {
    return robotEyesTest('/templated-typify/', this.test.title, {
      delay: 1000
    })
  })
})
