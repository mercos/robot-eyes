const getConfig = require('../../core/getConfig')
const cleanFolderContent = require('../../core/cleanFolderContent')

const cleanTestFiles = async () => {
  const config = getConfig()
  await cleanFolderContent(config.paths.testImages)
  await cleanFolderContent(config.paths.diffImages)
}

module.exports = cleanTestFiles
