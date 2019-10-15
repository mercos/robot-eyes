const waitFor = async (page, listToWait) => {
  if (listToWait && listToWait.length) {
    for (let i = 0; i < listToWait.length; i++) {
      const x = listToWait[i]
      await page.waitFor(x)
    }
  }
}

module.exports = waitFor
