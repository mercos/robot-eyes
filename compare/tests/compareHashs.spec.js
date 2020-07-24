const chai = require('chai')
const expect = chai.expect
const mock = require('mock-fs')
const compareHashs = require('../compareHashs')
const getFilePath = require('../../core/getFilePath')
chai.use(require('chai-as-promised'))

const config = {
  paths: {
    referenceImages: '/referenceImages',
    testImages: '/testImages'
  }
}
const fileName = 'index'
const viewport = { width: 1920, height: 1080 }

describe('compareHashs', function () {
  it('should throw an exception if reference file not found', function () {
    mock({
      [getFilePath(config.paths.testImages, fileName, viewport)]: Buffer.from([])
    })

    return expect(compareHashs(config, fileName, viewport))
      .to.eventually.be.rejected
      .and.be.an.instanceOf(Error)
      .and.have.property('code', 'ENOENT')
  })

  it('should throw an exception if test file not found', function () {
    mock({
      [getFilePath(config.paths.referenceImages, fileName, viewport)]: Buffer.from([])
    })

    return expect(compareHashs(config, fileName, viewport))
      .to.eventually.be.rejected
      .and.be.an.instanceOf(Error)
      .and.have.property('code', 'ENOENT')
  })

  it('should resolve if hashs are the same', function () {
    mock({
      [getFilePath(config.paths.referenceImages, fileName, viewport)]: Buffer.from([9, 8, 7]),
      [getFilePath(config.paths.testImages, fileName, viewport)]: Buffer.from([9, 8, 7])
    })

    return expect(compareHashs(config, fileName, viewport))
      .to.eventually.be.fulfilled
  })

  it('should throw an exception if hashs are not the same', function () {
    mock({
      [getFilePath(config.paths.referenceImages, fileName, viewport)]: Buffer.from([9, 8, 7]),
      [getFilePath(config.paths.testImages, fileName, viewport)]: Buffer.from([9, 8, 7])
    })

    return expect(compareHashs(config, fileName, viewport))
      .to.eventually.be.rejectedWith('Image\'s hashs are not the same')
  })
})
