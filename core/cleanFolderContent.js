const rimraf = require('rimraf')

const cleanFolderContent = folderName => {
  return new Promise((resolve, reject) => {
    rimraf(folderName, {})
      .then(() => resolve())
      .catch((err) => reject(err))
  })
}

module.exports = cleanFolderContent
