const fs = require('fs')
const { expect } = require('chai')
const mock = require('mock-fs')
const createFolder = require('../createFolder')

describe('createFolder', function () {
  afterEach(function () {
    mock.restore()
  })

  it('should create folder', function () {
    const folderName = 'folder'
  })
})