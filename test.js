const capture = require('./capture')
const compare = require('./compare')

const test = (url, title, options, defaultOptions) => {
  return new Promise(async (resolve, reject) => {
    try {
      await capture(url, title, Object.assign(defaultOptions || {}, options || {}))
      await compare(title)
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = test