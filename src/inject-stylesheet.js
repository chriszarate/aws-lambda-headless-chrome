/* global document */

const fs = require('fs');
const path = require('path');

const inject = (cssString) => {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssString;

  document.querySelector('head').appendChild(style);
};

function injectStylesheet(stylesheet) {
  console.log(`Injecting stylesheet ${stylesheet}....`);

  const data = fs.readFileSync(path.resolve(stylesheet));
  const cssString = data.toString().replace(/\n/g, '');
  const injectString = inject.toString().replace(/\n/g, '');

  return `(${injectString})('${cssString}')`;
}

module.exports = injectStylesheet;
