var fs = require('fs'),
  PNG = require('pngjs').PNG,
  pixelmatch = require('pixelmatch');
const getConfig = require('../core/getConfig')
const getFilePath = require('../core/getFilePath')
const createFolder = require('../core/createFolder')

const compareImages = (fileName, viewport) => {
  return new Promise(async (resolve, reject) => {
    const config = getConfig()
    console.log()

    try {
      const referenceImage = PNG.sync.read(fs.readFileSync(getFilePath(config.paths.referenceImages, fileName, viewport)))
      const testImage = PNG.sync.read(fs.readFileSync(getFilePath(config.paths.testImages, fileName, viewport)))

      const diff = new PNG({width: referenceImage.width, height: referenceImage.height});

      const numberOfDifferentPixels = pixelmatch(referenceImage.data, testImage.data, diff.data, referenceImage.width, referenceImage.height, {threshold: config.threshold})

      if (numberOfDifferentPixels > 0) {
        await createFolder(`${config.paths.diffImages}/${fileName}`)

        const diffImagePath = getFilePath(config.paths.diffImages, fileName, viewport)
        diff.pack().pipe(fs.createWriteStream(diffImagePath));
        reject(new Error(`Images are not the same. See difference at ${diffImagePath}.`))
      } else {
        resolve()
      }
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = compareImages