const getConfig = require('../../core/getConfig')
const path = require('path')
const getFilePath = require('../../core/getFilePath')
const walkSync = require('../../core/walkSync')

const getFailedTests = () => {
  const config = getConfig()
  const diffImageFiles = walkSync(path.resolve(config.paths.diffImages) + '/')
  const failedTests = []
  diffImageFiles.forEach(diffImageFile => {
    const diffImageFileSplited = diffImageFile.split('/')
    const name = diffImageFileSplited[diffImageFileSplited.length - 2]
    const failedTest = failedTests.find(a => a.name === name)
    const viewportString = diffImageFileSplited[diffImageFileSplited.length - 1].replace(name, '').split('.')[0]
    const viewport = {
      width: parseInt(viewportString.split('x')[0]),
      height: parseInt(viewportString.split('x')[1]),
      name: viewportString
    }
    const testImageFilePath = path.resolve(getFilePath(config.paths.testImages, name, viewport))
    const referenceImageFilePath = path.resolve(getFilePath(config.paths.referenceImages, name, viewport))
    const x = {
      name: viewport.name,
      width: viewport.width,
      height: viewport.height,
      testImage: testImageFilePath,
      diffImage: diffImageFile,
      referenceImage: referenceImageFilePath
    }
    if (failedTest) {
      failedTest.viewports.push(x)
    } else {
      failedTests.push({
        name: name,
        viewports: [x]
      })
    }
  })
  return failedTests
}

module.exports = getFailedTests