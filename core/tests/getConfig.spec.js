const { expect } = require('chai')
const getConfig = require('../getConfig')

describe('getConfig', function () {
  it('should thrown an error if config file not found', function () {
    expect(() => getConfig()).to.throw('ENOENT')
  })
})