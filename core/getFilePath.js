const getViewportName = require('./getViewportName')
const getFileFolder = require('./getFileFolder')

const getFilePath = (folderPath, fileName, viewport) => {
  const fileFolder = getFileFolder(folderPath, fileName)
  const viewportName = typeof (viewport) === 'object' ? getViewportName(viewport) : viewport
  return `${fileFolder}/${fileName}${viewportName}.png`
}

module.exports = getFilePath
