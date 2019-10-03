function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const retry = (func, attempts, delay) => {
  return new Promise(async (resolve, reject) => {
    let attemptCount = 1;
    let result = false;
    let error = null;
    do {
      try {
        await func()
        result = true
      } catch (e) {
        error = e
        attemptCount = attemptCount + 1
        await sleep(delay)
      }
    } while (attemptCount < attempts && !result)

    result ? resolve(true) : reject(error)
  })
}

module.exports = retry