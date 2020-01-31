const { assert } = require('chai')
const getFilePath = require('../getFilePath')
const getViewportName = require('../getViewportName')

const FOLDERPATH = 'folder'
const FILENAME = 'filename'
const EXTENSION = '.png'

describe('getFilePath', function () {
  it('should return path when viewport is an object', function () {
    const viewport = { width: 1920, height: 1080 }

    const result = getFilePath(FOLDERPATH, FILENAME, viewport)

    assert.equal(result, `${FOLDERPATH}/${FILENAME}/${FILENAME}${getViewportName(viewport)}${EXTENSION}`)
  })

  it('should return path when viewport is a string', function () {
    const viewport = '1920x1080'

    const result = getFilePath(FOLDERPATH, FILENAME, viewport)

    assert.equal(result, `${FOLDERPATH}/${FILENAME}/${FILENAME}${viewport}${EXTENSION}`)
  })
})
