const getConfig = require('../core/getConfig')
const openBrowser = require('./openBrowser')
const resizeAndPrint = require('./resizeAndPrint')
const removeElements = require('./removeElements')
const waitFor = require('./waitFor')
const disableBlinkingCursor = require('./disableBlinkingCursor')

const capture = async (url, testName, options = {}) => {
  const config = getConfig()
  const browser = await openBrowser()
  const viewports = config.viewports

  try {
    const page = await browser.newPage()
    if (options.cookies && options.cookies.length) {
      await page.setCookie(...options.cookies)
    }

    const fullUrl = `${config.baseURL}${url}`

    await page.goto(fullUrl, {waitUntil: 'networkidle0'})

    if (options.delay) {
      await waitFor(page, [options.delay])
    }

    await removeElements(page, options.removeSelectors)
    await disableBlinkingCursor(page)

    if (options.onReady) {
      await options.onReady(page)
    }

    await resizeAndPrint(page, viewports, testName)
    await browser.close()
  } catch (e) {
    await browser.close()
    throw e
  }
}

module.exports = capture