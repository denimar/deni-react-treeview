#!/usr/bin/env node

function execute(command) {
  const exec = require('child_process').exec

  exec(command, (err, stdout, stderr) => {
    process.stdout.write(stdout)
  })
}

(async () => {
  execute('npm version patch')
  execute('yarn build')
  execute('cd dist')
  execute('npm pack')
  execute('npm publish')
})();

 //&&  && cd dist && npm pack && npm publish && cd ..