function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const retry = (func, { attempts, delay, timeout, onFailedAttempt }) => {
  return new Promise(async (resolve, reject) => {
    let attemptCount = 1
    let result = false
    let error = null

    if (typeof timeout !== 'undefined') {
      delay = timeout < 500 ? timeout : 500
      attempts = Math.ceil(timeout / delay)
    }

    do {
      try {
        await func()
        result = true
      } catch (e) {
        error = e
        attemptCount = attemptCount + 1
        onFailedAttempt && onFailedAttempt(e, attemptCount, delay * attemptCount)
        await sleep(delay)
      }
    } while (attemptCount <= attempts && !result)

    result ? resolve(true) : reject(error)
  })
}

module.exports = retry
