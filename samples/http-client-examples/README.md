# HTTP Client Examples

Examples for using the HTTP Client in SAP Cloud SDK for JavaScript.

Refer to [the documentation](https://sap.github.io/cloud-sdk/docs/js/features/connectivity/generic-http-client).

## Instructions to run locally

### Install dependencies

```
npm ci
```

### Run tests

The examples are implemented in [http-client.spec.ts](./http-client.spec.ts).
They are built as tests which demonstrate how to use the HTTP Client.

To run the tests, execute the following command:

```
npm run test
```

This will start a local [express](https://expressjs.com/)-based HTTP server and perform a few example requests using the HTTP Client.
