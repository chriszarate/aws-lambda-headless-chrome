const spawn = require('./src/spawn-chrome');
const captureScreenshot = require('./src/capture-screenshot');

const url = 'https://twitter.com/realDonaldTrump';

exports.handler = function (lambdaEvent, context, callback) {
  spawn()
    .then(() => captureScreenshot(url))
    .then((s3Response) => {
      callback(null, s3Response);
    })
    .catch((err) => {
      console.error(err);
      callback(new Error('Could not generate screenshot.'));
    });
};
