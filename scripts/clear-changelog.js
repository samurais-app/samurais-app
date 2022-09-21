const fs = require('fs');
const { join } = require('path');

function files(path) {
  const paths = fs.readdirSync(path).map((item) => join(path, item)).filter((item) => !item.includes('node_modules'));
  const dirs = paths.filter((item) => fs.statSync(item).isDirectory());
  const logfiles = paths.filter((item) => fs.statSync(item).isFile() && item.includes('CHANGELOG.md'));
  return logfiles.concat(dirs.reduce((a,b) => {
      return a.concat(files(b));
    },[]))
}

function main() {
  const list = files(join(process.cwd(),'.'));
  list.forEach((item) => {
    fs.unlinkSync(item);
  })
}

main();