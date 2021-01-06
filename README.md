# Submission3-WFDE

Please open in Chrome

## NPM Runner 

*   npm run **start-dev** : Start a development server, available to outer hosts.
*   npm run **dev-debug** : Similar to **start-dev,** but with VSCode Debugging
*   npm run **build** : Build to mode **production.** Served in **dist** folder.
*   npm run **start** : Start a Node Server.
*   npm run **lint** : Lint Code Validation.
*   npm run **lint-then-fix** : Lint Code Validation with auto fix.
*   npm run **test** : Starts a Karma Jasmine Unit Tests.
*   npm run **e2eTest** : Starts End To End Testing with codeceptjs & Puppeteer.

## Code

Use TypeScript as a main language to develop website, javascript to configure the webpack, SASS to configure the main styling of application, CSS for other styling (material-icons), and HTML5 for template.

## Test Scope

**Unit Test :** All Base Class (application, activity, fragment, fragment adapter) and API code for logic testing

**End to End Test :** All Scope Test


## How To Run (Locally)

Type command **npm run build** to build the ressources and **npm run start** to start the NodeJS Server. Please don't use another locale runner server, because we use **brotli** compression mechanisms to handle javascript compression (due to reduce the size of load file). So if you use another server, there will be a performance degradation, because not implementing **Accept-Encoding** & **Content-Encoding** headers.

## How To Run (Test)

There are 2 test to be run : 

#### Unit Test

Type command **npm run test** to start karma jasmine test. The total of test is approximately 45 case, which will be end in about 2 seconds.

#### End To End Testing

Firstly, type **npm run dev-debug** to start live server for serving assets for codeceptjs. Switch to another tabs, please don't close and type **npm run e2eTest** to start end to end testing. Total of test is approximately 23 case, which will be end in about 3m 40s. 


## How To Run (Another Server)

Please open [https://restaurant-apwapps.herokuapp.com](https://restaurant-apwapps.herokuapp.com) on your browser.


