const fs = require('fs')
const resembleCompare = require('resemblejs/compareImages')
const getFilePath = require('../core/getFilePath')
const createFolder = require('../core/createFolder')

const compareImages = (config, fileName, viewport) => {
  return new Promise(async (resolve, reject) => {
    try {
      const referenceImage = fs.readFileSync(getFilePath(config.paths.referenceImages, fileName, viewport))
      const testImage = fs.readFileSync(getFilePath(config.paths.testImages, fileName, viewport))

      const result = await resembleCompare(
        referenceImage,
        testImage,
        config.resembleOptions
      )

      if (result.rawMisMatchPercentage > config.threshold) {
        await createFolder(`${config.paths.diffImages}/${fileName}`)
        const diffImagePath = getFilePath(config.paths.diffImages, fileName, viewport)
        fs.writeFileSync(diffImagePath, result.getBuffer())
        reject(new Error(`Images are not the same (${result.rawMisMatchPercentage}%). See difference at ${diffImagePath}.`))
      } else {
        resolve()
      }
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = compareImages
