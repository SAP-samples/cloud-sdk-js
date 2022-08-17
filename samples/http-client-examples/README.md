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
node server.js
```

### Execute HTTP requests

In another terminal, make HTTP requests to demo-server.

```
npx ts-node --esm client.mts
```
