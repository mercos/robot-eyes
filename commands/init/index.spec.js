const chai = require('chai')
const expect = chai.expect
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const mock = require('mock-fs')
const init = require('./index')
const { version } = require('../../package.json')
chai.use(require('chai-as-promised'))

const MAIN_FOLDER = './robot-eyes'

describe('init command', function () {
  afterEach(function () {
    mock.restore()

    return new Promise((resolve, reject) => {
      rimraf('./robot-eyes', {})
        .then(() => resolve())
        .catch((err) => reject(err))
    })
  })

  it('should throw an exception if reference file not found', function () {
    mock({
      './robot-eyes': {}
    })

    return expect(init())
      .to.eventually.be.rejectedWith(`Path ${path.resolve('./robot-eyes')} already exists`)
  })

  it('should create docker-compose.yml', async function () {
    await init()

    expect(fs.existsSync(`${MAIN_FOLDER}/docker-compose.yml`)).to.be.true
  })

  it('docker-compose.yml should replace current version', async function () {
    await init()

    const dockerCompose = fs.readFileSync(`${MAIN_FOLDER}/docker-compose.yml`, 'utf8')
    expect(dockerCompose).to.include(`mercos/robot-eyes:${version}`)
  })

  it('should create robot-eyes.json', async function () {
    await init()

    expect(fs.existsSync(`${MAIN_FOLDER}/robot-eyes.json`)).to.be.true
  })

  it('should create test.js', async function () {
    await init()

    expect(fs.existsSync(`${MAIN_FOLDER}/test.js`)).to.be.true
  })

  it('should create example_app', async function () {
    await init()

    expect(fs.existsSync(`${MAIN_FOLDER}/example_app/`)).to.be.true
  })

  it('should create images folder', async function () {
    await init()

    expect(fs.existsSync(`${MAIN_FOLDER}/images/`)).to.be.true
  })
})
