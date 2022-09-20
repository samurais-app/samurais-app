import fs from 'fs/promises';
import Fs from 'fs';


function fstat(code: number) {
  return new Promise((res, rej) => {
    Fs.fstat(code, (err, stats) => {
      if (err) return rej(err);
      return res(stats);
    });
  });
}


function readFile(path: string) {
  return fs.readFile(path);
}

export default {
  fstat,
  readFile,
  rename: fs.rename,
  mkdir: fs.mkdir,
  writeFile: fs.writeFile,
  readdir: fs.readdir,
  stat: fs.stat,
  access: fs.access,
  unlink: fs.unlink,
  rmdir: fs.rmdir,
  open: fs.open,
}

