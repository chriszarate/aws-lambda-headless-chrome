const os = require('os');
const path = require('path');
const cp = require('child_process');
const got = require('got');

const config = require('../config');
const extractChrome = require('./extract-chrome');
const { loading } = require('./utils');

function waitForChrome() {
  console.log('Waiting for headless Chrome....');
  return got(`${config.chrome.headlessUrl}/json`, { retries: 0, timeout: 100 });
}

function startChrome() {
  console.log('Starting headless Chrome....');

  return extractChrome().then(() => {
    console.log('Extracted headless Chrome....');

    const chrome = cp.spawn(
      path.resolve(config.chrome.path),
      config.chromeFlags,
      {
        cwd: os.tmpdir(),
        shell: true,
        detached: true,
        stdio: 'ignore',
      }
    );

    chrome.unref();
  }).then(() => {
    console.log('Spawned headless Chrome....');
    return loading(waitForChrome, config.chrome.startupTimeout);
  });
}

function spawn() {
  return waitForChrome().then(() => {
    console.log('Headless Chrome is already running....');
  }).catch(startChrome);
}

module.exports = spawn;
