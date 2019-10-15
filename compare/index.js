const compareHashs = require('./compareHashs')
const compareImages = require('./compareImages')
const getConfig = require('../core/getConfig')
const testNameToFileName = require('../core/testNameToFileName')

const compareSingleViewport = (fileName, viewport) => {
  return new Promise((resolve, reject) => {
    compareHashs(fileName, viewport).then(resolve).catch((e) => {
      const config = getConfig()
      if (config.skipDiffGeneration) {
        reject(e)
      } else {
        compareImages(fileName, viewport).then(resolve).catch(reject)
      }
    })
  })
}

const compare = (testName) => {
  return new Promise(async (resolve, reject) => {
    const config = getConfig()
    const failedViewports = []
    const fileName = testNameToFileName(testName)
    const viewports = config.viewports

    for (let i = 0; i < viewports.length; i++) {
      const viewport = viewports[i]
      await compareSingleViewport(fileName, viewport).catch(e => {
        failedViewports.push({
          viewport,
          error: e
        })
      })
    }

    if (failedViewports.length > 0) {
      const failMessage = failedViewports.map(a => `${a.viewport.width}x${a.viewport.height}: ${a.error.message}`).join('\n')
      // reject(new Error(`Images are different in this resolutions: ${failMessage}`))
      reject(new Error(failMessage))
    } else {
      resolve()
    }
  })
}

module.exports = compare
