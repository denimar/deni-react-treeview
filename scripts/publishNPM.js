function execShellCommand(cmd) {
  const exec = require('child_process').exec
  return new Promise((resolve, reject) =>
    exec(cmd, (error, stdout, stderr) =>
      error ? reject(new Error(error.message)) : resolve(stdout ? stdout : stderr)
    )
  )
}

(async () => {
  execShellCommand('npm version patch && yarn build && cd dist && npm pack && npm publish')
})();