# HTTP Client Examples

Examples for using the HTTP Client in SAP Cloud SDK for JavaScript.

Refer to [the documentation](https://sap.github.io/cloud-sdk/docs/js/features/connectivity/generic-http-client).

## Instructions to run locally

### Install dependencies

```
npm ci
```

### Start demo-server

This script starts a small [express](https://expressjs.com/) based HTTP server for demonstration purposes.

```
npx ts-node --esm server.mts
```

### Execute HTTP requests

In another terminal, make HTTP requests to demo-server.

```
export destinations="[{\"name\": \"MyLocalDestination\", \"url\": \"http://localhost:3000\"}]"
npx ts-node --esm client.mts
```

## Test

`npm test` will run both the client and the server and stop the server after a few seconds.
Both commands should exit with code `0`.

The tests are run by [concurrently](https://www.npmjs.com/package/concurrently).
The purpose of the tests is to see that our usage examples still work.
See the `test` script in `package.json` for the command line.
