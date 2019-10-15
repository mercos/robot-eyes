const getConfig = require('../core/getConfig')
const getFilePath = require('../core/getFilePath')
const testNameToFileName = require('../core/testNameToFileName')
const createFolder = require('../core/createFolder')

const resizeAndPrint = async (page, viewports, testName) => {
  const fileName = testNameToFileName(testName)
  const config = getConfig()
  for (let i = 0; i < viewports.length; i++) {
    const viewport = viewports[i]
    await page.setViewport({
      width: viewport.width,
      height: viewport.height
    })

    await page.waitFor(200)

    await createFolder(`${config.paths.testImages}/${fileName}`)
    const filePath = getFilePath(config.paths.testImages, fileName, viewport)
    await page.screenshot({
      path: filePath,
      fullPage: true
    })
  }
}

module.exports = resizeAndPrint
