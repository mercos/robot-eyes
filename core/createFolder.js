const mkdirp = require('mkdirp')
const path = require('path')

const createFolder = fileOrFolderPath => {
  const dir = path.extname(fileOrFolderPath) ? path.dirname(fileOrFolderPath) : fileOrFolderPath
  return new Promise((resolve, reject) => {
    mkdirp(dir)
      .then(() => resolve())
      .catch((err) => reject(err))
  })
}

module.exports = createFolder
