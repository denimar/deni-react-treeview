const fs = require('fs');
var fse = require("fs-extra");
const pkg = require('../package.json');

(async () => {
  fs.copyFileSync('LICENSE', './dist/LICENSE');
  fs.copyFileSync('README.md', './dist/README.md');
  fs.writeFileSync('./dist/package.json', JSON.stringify({ ...pkg }, null, 2));

  fse.copy('./src/components/styles', './dist/styles')
})();