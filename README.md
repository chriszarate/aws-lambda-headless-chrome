# Run headless Chrome on AWS Lambda

This is an example of running [headless Chrome][headless-chrome] on AWS Lambda.
The instructions below use [ClaudiaJS][claudia] to package the function, but it
isn't a dependency—just a build/deploy tool. The included Google Chrome binary,
compiled for Lambda, comes from the [Serverless Chrome][serverless-chrome]
project.

## Hello world

Claudia must be installed globally.

```sh
npm i -g claudia
```

Create the Lambda function.

```sh
claudia create --region us-east-1 --handler index.handler --memory 1280 --timeout 120
```

Note the adjustments to allocated memory and timeout.

Now you can trigger the function.

```sh
claudia test-lambda
```

# Notes

Chrome is a large binary; it fits under Lambda's current 50MB limit with just a
few MB to spare. That should be enough, however, for some interesting projects.

Because the payload is so large, you may hit a timeout when uploading to AWS
with Claudia. Use the `--aws-client-timeout` flag to increase the timeout from
the default (120000ms / 120s / 2min).

Note that while screenshots are easy to take with headless Chrome, the browser
is running on Linux with non-mainstream font support. Web fonts are fully
supported, though. See the [DevTools API documentation][dev-tools] for more
information.

[headless-chrome]: https://developers.google.com/web/updates/2017/04/headless-chrome
[claudia]: https://claudiajs.com
[serverless-chrome]: https://github.com/adieuadieu/serverless-chrome
[dev-tools]: https://chromedevtools.github.io/devtools-protocol/tot/
