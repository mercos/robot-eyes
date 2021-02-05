const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const { ncp } = require('ncp')
const { renderTemplateFile } = require('template-file')
const { version } = require('../../package.json')

const MAIN_FOLDER = './robot-eyes'
const FILES_FOLDER = path.join(__dirname, 'files')

const copyFolder = (origin, destination) => {
  return new Promise((resolve, reject) => {
    ncp(origin, destination, err => { err ? reject(err) : resolve() })
  })
}

module.exports = async () => {
  if (fs.existsSync(MAIN_FOLDER)) {
    throw new Error(`Path ${path.resolve(MAIN_FOLDER)} already exists`)
  }

  await mkdirp(MAIN_FOLDER)
  const dockerComposeFile = await renderTemplateFile(`${FILES_FOLDER}/docker-compose.yml`, { version })
  fs.writeFileSync(`${MAIN_FOLDER}/docker-compose.yml`, dockerComposeFile)
  fs.copyFileSync(`${FILES_FOLDER}/robot-eyes.json`, `${MAIN_FOLDER}/robot-eyes.json`)
  fs.copyFileSync(`${FILES_FOLDER}/test.js`, `${MAIN_FOLDER}/test.js`)
  await copyFolder(`${FILES_FOLDER}/example_app`, `${MAIN_FOLDER}/example_app`)
  await copyFolder(`${FILES_FOLDER}/images`, `${MAIN_FOLDER}/images`)
}
