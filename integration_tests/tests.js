const _test = require('../test')

describe('Integration tests', function () {
  it('Index', function () {
    return _test('/index.html', this.test.title)
  })

  it('Generic', function () {
    return _test('/generic.html', this.test.title)
  })

  it('Elements', function () {
    return _test('/elements.html', this.test.title)
  })
})
