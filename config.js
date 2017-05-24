const chrome = {
  pageLoadTimeout: 1000 * 10,
};

const s3 = {
  bucket: 'twitter-screenshot-target',
};

// `fromSurface: true` is needed on OS X.
const screenshot = {
  format: 'png',
  timeout: 5000,
};

module.exports = {
  chrome,
  s3,
  screenshot,
};
