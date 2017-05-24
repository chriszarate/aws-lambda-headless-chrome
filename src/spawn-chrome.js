const cp = require('child_process');
const decompress = require('decompress');
const got = require('got');
const path = require('path');
const { loading } = require('./utils');

let options;
let debug = () => {};

function extractChrome() {
  return decompress(path.resolve(__dirname, '../chrome-headless-lambda-linux-x64.tar.gz'), `${options.tmpDir}/`);
}

function waitForChrome() {
  debug('Waiting for headless Chrome....');
  return got(`http://127.0.0.1:${options.port}/json`, { retries: 0, timeout: 100 });
}

function startChrome() {
  debug('Extracting headless Chrome....');

  return extractChrome().then(() => {
    debug('Extracted headless Chrome....');
    debug(`Starting headless Chrome with flags: ${options.flags.join(' ')}`);

    const chrome = cp.spawn(
      path.resolve(`${options.tmpDir}/headless-chrome/headless_shell`),
      options.flags,
      {
        cwd: options.tmpDir,
        shell: true,
        detached: true,
        stdio: 'ignore',
      }
    );

    chrome.unref();
  }).then(() => {
    debug('Spawned headless Chrome....');
    return loading(waitForChrome, options.timeout);
  });
}

function spawnChrome(runTimeOptions) {
  options = runTimeOptions;

  if (options.debug) {
    debug = console.log;
  }

  return waitForChrome().then(() => {
    debug(options.debug, 'Headless Chrome is already running....');
  }).catch(startChrome);
}

module.exports = spawnChrome;
