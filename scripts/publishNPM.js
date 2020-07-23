function execShellCommand(cmd) {
  const exec = require('child_process').exec
  return new Promise((resolve, reject) =>
    exec(cmd, (error, stdout, stderr) =>
      error || stderr ? reject(error || stderr) : resolve(stdout)
    )
  )
}

(async () => {
  await execShellCommand('npm version patch')
  await execShellCommand('yarn build')
  await execShellCommand('cd dist')
  await execShellCommand('npm pack && npm publish')
})();