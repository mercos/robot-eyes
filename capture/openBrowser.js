const puppeteer = require('puppeteer')

const openBrowser = config => {
  return puppeteer.launch({
    headless: config.headless,
    args: [
      '--no-sandbox',
      "--proxy-server='direct://'",
      '--proxy-bypass-list=*',
      '--disable-dev-shm-usage'
    ]
  })
}

module.exports = openBrowser
