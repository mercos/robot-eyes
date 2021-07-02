const { assert } = require('chai')
const retry = require('../retry')

const ERROR = new Error()
const ATTEMPTS = 3
const DELAY = 100

describe('Retry', function () {
  it('Should resolve if func doesnt throw an exception', async function () {
    const func = () => new Promise(resolve => resolve())

    const result = await retry(func, { attempts: ATTEMPTS, delay: DELAY })

    assert.isTrue(result)
  })

  it('Should reject if func throw an exception', async function () {
    const func = () => new Promise((resolve, reject) => reject(ERROR))

    return retry(func, { attempts: ATTEMPTS, delay: DELAY }).catch(e => assert.equal(e, ERROR))
  })

  it('Should resolve if func resolves after one failed attempt', async function () {
    let a = false
    const func = () => new Promise((resolve, reject) => {
      if (a) {
        resolve()
      } else {
        a = true
        reject(ERROR)
      }
    })

    const result = await retry(func, { attempts: ATTEMPTS, delay: DELAY })

    assert.isTrue(result)
  })

  it('Should wait 500ms between attempts', function () {
    const start = new Date()

    const func = () => new Promise((resolve, reject) => reject(ERROR))

    return retry(func, { attempts: 2, delay: 500 }).catch(e => {
      const end = new Date()
      assert.isAtLeast(end - start, 500)
    })
  })

  const attempts = 5
  it(`Should try ${attempts} times`, async function () {
    let attemptCount = 0

    const func = () => new Promise((resolve, reject) => {
      attemptCount++
      reject(ERROR)
    })

    return retry(func, { attempts: 5, delay: DELAY })
      .catch(e => assert.equal(attemptCount, attempts))
  })

  it('Should wait for timeout', function () {
    const start = new Date()
    let attemps = 0

    const func = () => new Promise((resolve, reject) => reject(ERROR))

    const onFailedAttempt = () => { attemps = attemps + 1 }
    return retry(func, { timeout: 1500, onFailedAttempt: onFailedAttempt }).catch(e => {
      const end = new Date()
      assert.isAtLeast(end - start, 1500)
      assert.equal(attemps, 3)
    })
  })

  it('Should wait for timeout less than 500ms', function () {
    const start = new Date()
    let attemps = 0

    const func = () => new Promise((resolve, reject) => reject(ERROR))

    const onFailedAttempt = () => { attemps = attemps + 1 }
    return retry(func, { timeout: 400, onFailedAttempt: onFailedAttempt }).catch(e => {
      const end = new Date()
      assert.isAtLeast(end - start, 400)
      assert.equal(attemps, 1)
    })
  })
})
