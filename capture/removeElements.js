const removeElements = async (page, removeSelectors) => {
  if (removeSelectors) {
    for (let i = 0; i < removeSelectors.length; i++) {
      const selector = removeSelectors[i]

      await page.evaluate((sel) => {
        const elements = document.querySelectorAll(sel);
        for (let i = 0; i < elements.length; i++) {
          elements[i].parentNode.removeChild(elements[i]);
        }
      }, selector)
    }
  }
}

module.exports = removeElements