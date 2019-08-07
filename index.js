#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')

const test = require('./commands/test')
const approve = require('./commands/approve')
const report = require('./commands/report')

program
  .command('test <test-file>')
  .description("Run tests")
  .option('-g, --grep <pattern>', 'Only run tests matching <pattern>')
  .option('-r, --report', 'Open report automatically if tests failed')
  .action((a, b) => {
    test(a, b.grep)
      .then(() => process.exitCode = 0)
      .catch((e) => {
        process.exitCode = 1

        if (e) {
          throw e
        }
        if (b.report) {
          report()
        }
      })
  })

program
  .command('report')
  .description("Open report")
  .option('-p, --port <port-number>', 'Run report on specific port')
  .action((options) => {
    report(options.port)
  })

program
  .command('approve [test-name]')
  .description("Approve")
  .option('-w, --viewport <viewport-name>', 'Approve single viewport')
  .action(function (a, b) {
    approve(a, b.viewport)
      .then(() => {
        process.exitCode = 0
        console.log(chalk.green(`${a} successfully approved`));
      })
      .catch((e) => {
        process.exitCode = 1
        console.error(chalk.red(e));
      })
  })

program.parse(process.argv)