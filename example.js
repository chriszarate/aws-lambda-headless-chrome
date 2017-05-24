const lambdaChrome = require('./index');

// Set up viewport resolution, etc.
const deviceMetrics = {
  deviceScaleFactor: 1,
  fitWindow: true,
  height: 1000,
  mobile: false,
  width: 1000,
};

exports.handler = (lambdaEvent, context, callback) => {
  lambdaChrome().then(client => {
    const { Emulation, Page, Runtime } = client;

    Page.loadEventFired(() => {
      console.log('Page loaded....');

      client.close().then(() => {
        callback(null, 'Success! Client shut down.');
      });
    });

    [
      Page.enable(),
      Runtime.enable(),
      Emulation.setDeviceMetricsOverride(deviceMetrics),
      Page.navigate({ url: 'https://www.google.com' }),
    ].reduce((p, fn) => p.then(fn), Promise.resolve());
  }).catch(callback);
};
