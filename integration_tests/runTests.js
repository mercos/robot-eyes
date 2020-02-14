const test = require('../commands/test')

const StaticServer = require('static-server')
const server = new StaticServer({
  rootPath: './templated-projection', // required, the root of the server file tree
  port: 3000
})

server.start(function () {
  console.log('Server listening to', server.port)

  test('tests.js')
    .then(() => { process.exitCode = 0 })
    .catch(() => { process.exitCode = 1 })
    .finally(() => {
      server.stop()
      console.log('Server stopped')
      process.exit()
    })
})
