const { assert } = require('chai')
const getFileFolder = require('../getFileFolder')

describe('getFileFolder', function() {
  it('should return folder and file name separated by slash', () => {
    const folderName = 'robot'
    const fileName = 'eyes'

    const result = getFileFolder(folderName, fileName)

    assert.equal(result, `${folderName}/${fileName}`)
  })
});