/* eslint-disable quote-props */
const fs = require('fs')
const { expect } = require('chai')
const mock = require('mock-fs')
const cleanFolderContent = require('../cleanFolderContent')

describe('cleanFolderContent', function () {
  it('should not thrown an error if folder do not exist', async function () {
    await cleanFolderContent('nonexistent_folder')
  })

  it('should not thrown an error if it receives a file as argument', async function () {
    const fileName = 'file.txt'
    mock({ fileName: '' })

    await cleanFolderContent(fileName)

    expect(fs.existsSync(fileName)).to.eq(false)
  })

  it('should clean folder and all its contents', async function () {
    const folderName = 'folder'
    mock({
      folderName: {
        'file.txt': '',
        'subfolder': {}
      }
    })

    await cleanFolderContent(folderName)

    expect(fs.existsSync(folderName)).to.eq(false)
  })
})
