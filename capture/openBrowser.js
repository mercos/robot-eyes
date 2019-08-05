const puppeteer = require('puppeteer')
const getConfig = require('../core/getConfig')

const openBrowser = () => {
  const config = getConfig()
  return puppeteer.launch({
    headless: config.headless,
    args: [
      '--no-sandbox',
      "--proxy-server='direct://'",
      '--proxy-bypass-list=*'
    ]
  })
}

module.exports = openBrowser