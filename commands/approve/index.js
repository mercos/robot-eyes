const fs = require('fs')
const getFilePath = require('../../core/getFilePath')
const getFileFolder = require('../../core/getFileFolder')
const createFolder = require('../../core/createFolder')
const getConfig = require('../../core/getConfig')
const testNameToFileName = require('../../core/testNameToFileName')
const ncp = require('ncp').ncp

const approve = (testName, viewport) => {
  return new Promise(async (resolve, reject) => {
    const config = getConfig()
    const fileName = testNameToFileName(testName)

    if (viewport) {
      const testImagePath = getFilePath(config.paths.testImages, fileName, viewport)
      const referenceImagePath = getFilePath(config.paths.referenceImages, fileName, viewport)
      await createFolder(referenceImagePath)
      fs.copyFile(testImagePath, referenceImagePath, (err) => {
        err ? reject(err) : resolve()
      });
    } else {
      const testImageFolder = getFileFolder(config.paths.testImages, fileName)
      const referenceImageFolder = getFileFolder(config.paths.referenceImages, fileName)
      await createFolder(referenceImageFolder)

      ncp(testImageFolder, referenceImageFolder, (err) => {
        err ? reject(err) : resolve()
      });
    }
  })
}

module.exports = approve