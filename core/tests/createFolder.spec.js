const fs = require('fs')
const { expect } = require('chai')
const createFolder = require('../createFolder')
const cleanFolderContent = require('../cleanFolderContent')

describe('createFolder', function () {
  it('should create folder', async function () {
    const folderName = 'folder'

    await createFolder(folderName)

    expect(fs.existsSync(folderName)).to.equal(true)
    await cleanFolderContent(folderName)
  })

  it('must create all folders above the file', async function () {
    const dir = 'dir'
    const subdir = `${dir}/subdir`
    const fileName = `${subdir}/file.txt`

    await createFolder(fileName)

    expect(fs.existsSync(subdir)).to.equal(true)
    await cleanFolderContent(dir)
  })

  it('should not throw error if folder already exists', async function () {
    const dir = 'dir'
    await createFolder(dir)

    await createFolder(dir)

    expect(fs.existsSync(dir)).to.equal(true)
    await cleanFolderContent(dir)
  })
})
