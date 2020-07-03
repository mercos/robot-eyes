const CRC32 = require('crc-32')
const fs = require('fs')
const getFilePath = require('../core/getFilePath')

const compareHashs = (config, fileName, viewport) => {
  return new Promise((resolve, reject) => {
    try {
      const referenceImage = fs.readFileSync(getFilePath(config.paths.referenceImages, fileName, viewport))
      const testImage = fs.readFileSync(getFilePath(config.paths.testImages, fileName, viewport))
      const hashsAreEqual = CRC32.buf(referenceImage) === CRC32.buf(testImage)
      hashsAreEqual ? resolve() : reject(new Error("Image's hashs are not the same"))
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = compareHashs
