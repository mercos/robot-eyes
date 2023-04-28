const takeScreenshot = require('./takeScreenshot')
const removeElements = require('./removeElements')
const disableBlinkingCursor = require('./disableBlinkingCursor')
const openBrowser = require('./openBrowser')

const tryCapture = async (url, testName, options, config) => {
  const browser = await openBrowser(config)

  try {
    for (let i = 0; i < config.viewports.length; i++) {
      const page = await browser.newPage()

      const viewport = config.viewports[i]
      await page.setViewport({
        width: viewport.width,
        height: viewport.height
      })

      if (options.cookies && options.cookies.length) {
        await page.setCookie(...options.cookies)
      }

      const fullUrl = `${config.baseURL}${url}`

      await page.goto(fullUrl)

      if (options.delay) {
        await page.waitForTimeout(options.delay)
      }

      await removeElements(page, options.removeSelectors)
      await disableBlinkingCursor(page)

      if (options.onReady) {
        await options.onReady(page)
      }

      await takeScreenshot(page, config, testName, viewport)
      await page.close()
    }
    await browser.close()
  } catch (e) {
    await browser.close()
    throw e
  }
}

module.exports = tryCapture
