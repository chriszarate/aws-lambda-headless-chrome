const startChrome = require('lambda-chrome');
const captureScreenshot = require('./src/capture-screenshot');

const url = 'https://twitter.com/realDonaldTrump';

exports.handler = function (lambdaEvent, context, callback) {
  startChrome()
    .then(client => captureScreenshot(client, url))
    .then(s3Response => {
      callback(null, s3Response);
    })
    .catch(err => {
      console.error(err);
      callback(new Error('Could not generate screenshot.'));
    });
};
