const mkdirp = require('mkdirp')
const path = require('path')

const createFolder = fileOrFolderPath => {
  const dir = path.extname(fileOrFolderPath) ? path.dirname(fileOrFolderPath) : fileOrFolderPath
  return new Promise((resolve, reject) => {
    mkdirp(dir, (err) => {
      if (err && err.code !== 'EEXIST') {
        reject(err)
      }

      resolve()
    })
  })
}

module.exports = createFolder
