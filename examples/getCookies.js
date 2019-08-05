const puppeteer = require('puppeteer')
const config = require('./robot-eyes')

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      timeout: 10000,
      args: [
        '--no-sandbox',
        '--proxy-server="direct://"',
        '--proxy-bypass-list=*'
      ]
    })

    try {
      const page = await browser.newPage()
      await page.goto(`${config.baseURL}/login`, {waitUntil: 'networkidle0'})
      await page.type('#email', 'email@example.com')
      await page.type('#password', 'pw')
      await page.click('button[type=submit]')

      const cookies = await page.cookies()
      await browser.close()
      resolve(cookies)
    } catch (e) {
      await browser.close()
      reject(e)
    }
  })
}
