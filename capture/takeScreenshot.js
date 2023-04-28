const getFilePath = require('../core/getFilePath')
const testNameToFileName = require('../core/testNameToFileName')
const createFolder = require('../core/createFolder')

const takeScreenshot = async (page, config, testName, viewport) => {
  const fileName = testNameToFileName(testName)
  await createFolder(`${config.paths.testImages}/${fileName}`)
  const filePath = getFilePath(config.paths.testImages, fileName, viewport)
  await page.screenshot({
    path: filePath,
    fullPage: true
  })
}

module.exports = takeScreenshot
