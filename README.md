# Agarbots

JSFiddle for agar.io bots!

## Running in Development Mode

```sh
npm install
npm run dev
```

This will start the webpack dev server on the defuault port (8080). It will also start the express server from `server/index.js` using nodemon.

Webpack dev server will watch for changes in the files from the `App` folder and hot load any changed modules.

nodemon will watch files in the `server` folder and restart the express server if any files change.

This means that you can update both your single page app and your backend during development and have the changes available immediately.

## Building for Production

```sh
npm run build
```

This will build the app and output the files to the `build` directory.

## Running the server

```sh
npm run server
```

This will launch the express server serving content from `build`

## Testing
Testing is done using karma + mocha with sinon for stubbing ajax requests. We use the [karma-webpack preprocessor](https://github.com/webpack/karma-webpack)
The karma config lives in `karma.conf.js` and is setup to run tests in Chrome and load up `tests.webpack.js`
`tests.webpack.js` loads up all the tests from the `tests` directory and bundles them all up using webpack. We then run them all at once.

To do a test run:

```sh
npm test
```

And to run continuous tests which rerun everytime a file changes:

```sh
npm run testing
```
