#!/usr/bin/env node

function execute(command) {
  const exec = require('child_process').exec

  exec(command, (err, stdout, stderr) => {
    process.stdout.write(stdout)
  })
}

(async () => {
  execute('npm version patch && yarn build && cd dist && pwd')
  execute('npm pack')
  execute('npm publish')
  execute('pwd')
})();

 //&&  && cd dist && npm pack && npm publish && cd ..