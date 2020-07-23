#!/usr/bin/env node

function execute(command) {
  const exec = require('child_process').exec

  exec(command, (err, stdout, stderr) => {
    if (err) console.log(`Error publishing NPM: ${err.message}`)
    process.stdout.write(stdout)
  })
}

(async () => {
  execute('npm version patch && yarn build && cd dist && npm pack && npm publish')
})();