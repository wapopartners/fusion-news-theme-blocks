const path = require('path');
const fs = require('fs');
const { exec } = require('child_process')

function fromDir(startPath, filter, callback) {
  // console.log('Starting from dir '+startPath+'/');

  if (!fs.existsSync(startPath)) {
    // eslint-disable-next-line no-console
    console.log('no dir ', startPath);
    return;
  }

  const files = fs.readdirSync(startPath);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter, callback); // recurse
    } else if (filter.test(filename)) callback(filename);
  }
}

fromDir('./blocks', /\.scss$/, (filename) => {
  const dir = filename.slice(0, filename.lastIndexOf('/'));

  exec(`npx postcss --no-map ${filename} --use autoprefixer  -d ${dir}`, (npmerr) => {
    if (npmerr) {
      // eslint-disable-next-line no-console
      console.error(`autoprefixer error: ${npmerr}`);
    } else {
      // eslint-disable-next-line no-console
      console.log('-- Autoprefixed: ', filename);
    }
  });
});
