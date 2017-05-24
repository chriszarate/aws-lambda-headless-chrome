const path = require('path');
const decompress = require('decompress');

const chromeTarball = path.resolve('./chrome-headless-lambda-linux-x64.tar.gz');

function extractChrome() {
  console.log('Extracting headless Chrome....');
  return decompress(path.resolve(chromeTarball), '/tmp/');
}

module.exports = extractChrome;
