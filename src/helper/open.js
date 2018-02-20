const {exec} = require('child_process');


module.exports = url => {
  switch (process.platform) {
    case 'darwin':
      exec(`open ${url}`);
      break;
    case 'win32':
      exec(`start ${url}`);
      break;
  }
}

// let child_process = require('child_process'),
//   url = 'http://' + youUrl;

// if (process.platform == 'wind32') {
//   cmd = 'start "%ProgramFiles%\Internet Explorer\iexplore.exe"';
// } else if (process.platform == 'linux') {
//   cmd = 'xdg-open';
// } else if (process.platform == 'darwin') {
//   cmd = 'open';
// }
// child_process.exec(`${cmd} "${url}"`);
