const fs = require('fs')

const walkSync = function (dir, filelist) {
  const files = fs.readdirSync(dir)
  filelist = filelist || []
  files.forEach(function (file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist)
    } else {
      filelist.push(dir + file)
    }
  })
  return filelist
}

module.exports = walkSync
