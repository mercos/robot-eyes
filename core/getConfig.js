const path = require('path')
const fs = require('fs')
const minimist = require('minimist')

const getConfig = () => {
  const args = minimist(process.argv)
  const configFile = fs.readFileSync(process.cwd() + '/robot-eyes.json')
  const userConfig = JSON.parse(configFile)
  const config = mergeDeep({
    baseURL: null,
    paths: {
      testImages: './images/test_images',
      diffImages: './images/diff_images',
      referenceImages: './images/reference_images'
    },
    viewports: [
      {
        width: 1920,
        height: 1080
      }
    ],
    timeout: 40000,
    headless: true,
    threshold: 0.01,
    waitForResourceTimeout: 60000,
    resembleOptions: {
      ignore: 'nothing',
      output: {
        largeImageThreshold: 0,
        transparency: 0.3
      }
    }
  }, userConfig)
  Object.keys(config.paths)
    .forEach(v => {
      config.paths[v] = path.resolve(config.paths[v])
    })

  if (args['base-url']) {
    config.baseURL = args['base-url']
  }

  return config
}

const mergeDeep = (obj1, obj2) => {
  const result = {};
  Object.assign(result, obj1);

  for (const prop of Object.keys(obj2)) {
    if (result.hasOwnProperty(prop) && typeof obj2[prop] === 'object' && !Array.isArray(obj2[prop])) {
      result[prop] = mergeDeep(result[prop], obj2[prop]);
    } else {
      result[prop] = obj2[prop];
    }
  }

  return result;
}

module.exports = getConfig
