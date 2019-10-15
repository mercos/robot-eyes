const { assert } = require('chai')
const retry = require('../retry')

const ERROR = new Error()
const ATTEMPTS = 3
const DELAY = 100

describe('Retry', function () {
  it('Should resolve if func doesnt throw an exception', async function () {
    const func = () => new Promise(resolve => resolve())

    const result = await retry(func, ATTEMPTS, DELAY)

    assert.isTrue(result)
  })

  it('Should reject if func throw an exception', async function () {
    const func = () => new Promise((resolve, reject) => reject(ERROR))

    return retry(func, ATTEMPTS, DELAY).catch(e => assert.equal(e, ERROR))
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

    const result = await retry(func, ATTEMPTS, DELAY)

    assert.isTrue(result)
  })

  it('Should wait 500ms between attempts', function () {
    const start = new Date()

    const func = () => new Promise((resolve, reject) => reject(ERROR))

    return retry(func, 2, 500).catch(e => {
      var end = new Date()
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

    return retry(func, 5, DELAY)
      .catch(e => assert.equal(attemptCount, attempts))
  })
})
