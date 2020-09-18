const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const { renderTemplateFile } = require('template-file')
const { version } = require('../../package.json')

const MAIN_FOLDER = './robot-eyes'

module.exports = async () => {
  if (fs.existsSync(MAIN_FOLDER)) {
    throw new Error(`Path ${path.resolve(MAIN_FOLDER)} already exists`)
  }

  await mkdirp(MAIN_FOLDER)
  const dockerComposeFile = await renderTemplateFile('./commands/init/files/docker-compose.yml', { version })
  fs.writeFileSync(`${MAIN_FOLDER}/docker-compose.yml`, dockerComposeFile)
  fs.copyFileSync('./commands/init/files/robot-eyes.json', `${MAIN_FOLDER}/robot-eyes.json`)
  fs.copyFileSync('./commands/init/files/test.js', `${MAIN_FOLDER}/test.js`)
}
