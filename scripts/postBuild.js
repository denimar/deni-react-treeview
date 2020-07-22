import fs from 'fs'
import pkg from '../package.json'

(async () => {
  fs.copyFileSync('LICENSE', './dist/LICENSE');
  fs.copyFileSync('README.md', './dist/README.md');

  // fs.mkdirSync('./dist/data')
  // fs.copyFileSync('src/data/countries-by-continents.json', './dist/data/countries-by-continents.json');  

  fs.writeFileSync('./dist/package.json', JSON.stringify({ ...pkg }, null, 2));
})();
