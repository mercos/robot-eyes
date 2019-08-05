const rimraf = require('rimraf')

const cleanFolderContent = folderName => {
  return new Promise((resolve, reject) => {
    rimraf(folderName, {}, err => {
      err ? reject(err) : resolve()
    })
  })
}

module.exports = cleanFolderContent