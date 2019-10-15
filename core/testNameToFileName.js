const testNameToFileName = (testName) => testName.replace(/\s+/g, '_')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '').toLowerCase()

module.exports = testNameToFileName
