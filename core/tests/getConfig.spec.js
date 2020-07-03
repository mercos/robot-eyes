const { expect } = require('chai')
const mock = require('mock-fs')
const getConfig = require('../getConfig')

describe('getConfig', function () {
  it('should thrown an error if config file not found', function () {
    expect(() => getConfig()).to.throw('ENOENT')
  })

  it('should thrown an error if config file has invalid content', function () {
    mock({ 'robot-eyes.json': 'Invalid JSON' })

    expect(() => getConfig()).to.throw('Unexpected token')
  })

  it('baseURL should be null by default', function () {
    createEmptyConfigFile()

    const config = getConfig()

    expect(config.baseURL).to.be.null
  })

  it('default baseURL should be replace by config file', function () {
    const baseURL = 'http://test.com'
    createConfigFile({ baseURL })

    const config = getConfig()

    expect(config.baseURL).to.equal(baseURL)
  })

  it('timeout should be 40000 by default', function () {
    createEmptyConfigFile()

    const config = getConfig()

    expect(config.timeout).to.equal(40000)
  })

  it('default timeout should be replace by config file', function () {
    const timeout = 10000
    createConfigFile({ timeout })

    const config = getConfig()

    expect(config.timeout).to.equal(timeout)
  })

  it('headless should be true by default', function () {
    createEmptyConfigFile()

    const config = getConfig()

    expect(config.headless).to.equal(true)
  })

  it('default headless should be replace by config file', function () {
    const headless = false
    createConfigFile({ headless })

    const config = getConfig()

    expect(config.headless).to.equal(headless)
  })

  it('threshold should be 0.01 by default', function () {
    createEmptyConfigFile()

    const config = getConfig()

    expect(config.threshold).to.equal(0.01)
  })

  it('default threshold should be replace by config file', function () {
    const threshold = 0.02
    createConfigFile({ threshold })

    const config = getConfig()

    expect(config.threshold).to.equal(threshold)
  })

  it('default viewports', function () {
    createEmptyConfigFile()

    const config = getConfig()

    expect(config.viewports).to.eql([{ width: 1920, height: 1080 }])
  })

  it('default viewports should be replace by config file', function () {
    const viewports = [{ width: 1366, height: 768 }]
    createConfigFile({ viewports })

    const config = getConfig()

    expect(config.viewports).to.eql(viewports)
  })

  it('default paths', function () {
    createEmptyConfigFile()

    const config = getConfig()

    compareResolvedAndUnresolvedPath(config.paths.testImages, './robot_eyes/test_images')
    compareResolvedAndUnresolvedPath(config.paths.diffImages, './robot_eyes/diff_images')
    compareResolvedAndUnresolvedPath(config.paths.referenceImages, './robot_eyes/reference_images')
  })

  it('default paths should be replace by config file', function () {
    const paths = {
      testImages: './test_images',
      diffImages: './diff_images',
      referenceImages: './reference_images'
    }
    createConfigFile({ paths })

    const config = getConfig()

    compareResolvedAndUnresolvedPath(config.paths.testImages, paths.testImages)
    compareResolvedAndUnresolvedPath(config.paths.diffImages, paths.diffImages)
    compareResolvedAndUnresolvedPath(config.paths.referenceImages, paths.referenceImages)
  })

  const compareResolvedAndUnresolvedPath = (resolved, unresolved) => {
    expect(resolved).to.satisfy(path => path.endsWith(unresolved.replace('.', '')))
  }

  const createEmptyConfigFile = () => mock({ 'robot-eyes.json': '{}' })

  const createConfigFile = config => mock({ 'robot-eyes.json': JSON.stringify(config) })
})
