const fs = require('fs')
const getFilePath = require('../../core/getFilePath')
const getFileFolder = require('../../core/getFileFolder')
const createFolder = require('../../core/createFolder')
const getConfig = require('../../core/getConfig')
const testNameToFileName = require('../../core/testNameToFileName')
const ncp = require('ncp').ncp

const approveAll = async (config, resolve, reject) => {
  const testImageFolder = config.paths.testImages
  const referenceImageFolder = config.paths.referenceImages
  await createFolder(referenceImageFolder)

  ncp(testImageFolder, referenceImageFolder, (err) => {
    err ? reject(err) : resolve()
  });
}

const approveSingleViewport = async (config, fileName, viewport, resolve, reject) => {
  const testImagePath = getFilePath(config.paths.testImages, fileName, viewport)
  const referenceImagePath = getFilePath(config.paths.referenceImages, fileName, viewport)
  await createFolder(referenceImagePath)
  fs.copyFile(testImagePath, referenceImagePath, (err) => {
    err ? reject(err) : resolve()
  });
}

const approveAllViewportsFromTest = async (config, fileName, resolve, reject) => {
  const testImageFolder = getFileFolder(config.paths.testImages, fileName)
  const referenceImageFolder = getFileFolder(config.paths.referenceImages, fileName)
  await createFolder(referenceImageFolder)

  ncp(testImageFolder, referenceImageFolder, (err) => {
    err ? reject(err) : resolve()
  });
}

const approve = (testName, viewport) => {
  return new Promise(async (resolve, reject) => {
    const config = getConfig()
    const fileName = testNameToFileName(testName)

    if (!a) {
      await approveAll(config, resolve, reject)
    } else if (viewport) {
      await approveSingleViewport(config, fileName, viewport, resolve, reject)
    } else {
      await approveAllViewportsFromTest(config, fileName, resolve, reject)
    }
  })
}

module.exports = approve