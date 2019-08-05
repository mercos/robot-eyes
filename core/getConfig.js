const path = require('path')
const fs = require('fs')

const getConfig = () => {
  const configFile = fs.readFileSync(process.cwd() + '/robot-eyes.json')
  const userConfig = JSON.parse(configFile)
  return Object.assign({
    baseURL: null,
    paths: {
      testFiles: path.resolve('./robot_eyes/test_files'),
      testImages: path.resolve('./robot_eyes/test_images'),
      diffImages: path.resolve('./robot_eyes/diff_images'),
      referenceImages: path.resolve('./robot_eyes/reference_images')
    },
    viewports: [
      {
        width: 1920,
        height: 1080
      }
    ],
    timeout: 40000,
    headless: true,
    threshold: 0.01
  }, userConfig)
}

module.exports = getConfig