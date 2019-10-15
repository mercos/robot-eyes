const resizeAndPrint = require('./resizeAndPrint')
const removeElements = require('./removeElements')
const waitFor = require('./waitFor')
const disableBlinkingCursor = require('./disableBlinkingCursor')

const tryCapture = async (browser, url, testName, viewports, options, config) => {
  try {
    const page = await browser.newPage()
    if (options.cookies && options.cookies.length) {
      await page.setCookie(...options.cookies)
    }

    const fullUrl = `${config.baseURL}${url}`

    await page.goto(fullUrl)

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

module.exports = tryCapture
