var exec = require('child_process').exec

const report = () => {
  const cwd = process.cwd()

  exec(`cd node_modules/stoned/report && npx webpack && npx electron . --root-path=${cwd}`, {
    cwd
  }, (a, b, c) => {
    console.log(a, b, c)
  })
}

module.exports = report