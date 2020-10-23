const getFilePath = require('../core/getFilePath')
const testNameToFileName = require('../core/testNameToFileName')
const createFolder = require('../core/createFolder')

const resizeAndPrint = async (page, config, testName) => {
  const fileName = testNameToFileName(testName)
  for (let i = 0; i < config.viewports.length; i++) {
    const viewport = config.viewports[i]
    await page.setViewport({
      width: viewport.width,
      height: viewport.height
    })

    await page.waitForTimeout(200)

    await createFolder(`${config.paths.testImages}/${fileName}`)
    const filePath = getFilePath(config.paths.testImages, fileName, viewport)
    await page.screenshot({
      path: filePath,
      fullPage: true
    })
  }
}

module.exports = resizeAndPrint
