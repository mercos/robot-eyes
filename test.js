const capture = require('./capture')
const compare = require('./compare')

const test = (url, title, options) => {
  return new Promise(async (resolve, reject) => {
    try {
      await capture(url, title, options)
      await compare(title)
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = test