/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
require('ts-node/register');
const { setHeadlessWhen } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: 'test/e2e_test/**/*.e2eTest.ts',
  output: 'test/output/e2e_test',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:8080',
      show: true,
      windowSize: '1200x900',
      chrome: {
        args: [
          '--disable-web-security',
        ],
      },
    },
    AssertWrapper: {
      "require": "codeceptjs-assert"
    },
    REST: {
      endpoint: 'https://dicoding-restaurant-api.el.r.appspot.com',
      defaultHeaders: {
        'X-Auth-Token': '12345',
        'Content-Type': 'application/json'
      }
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'Submission3-WFDE',
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
}