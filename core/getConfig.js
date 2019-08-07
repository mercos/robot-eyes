const path = require('path')
const fs = require('fs')

const getConfig = () => {
  const configFile = fs.readFileSync(process.cwd() + '/robot-eyes.json')
  const userConfig = JSON.parse(configFile)
  const config = Object.assign({
    baseURL: null,
    paths: {
      testImages: './robot_eyes/test_images',
      diffImages: './robot_eyes/diff_images',
      referenceImages: './robot_eyes/reference_images'
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
  Object.keys(config.paths)
    .forEach(v => config.paths[v] = path.resolve(config.paths[v]))

  return config
}

module.exports = getConfig