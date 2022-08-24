# HTTP Client Examples

Examples for using the HTTP Client in SAP Cloud SDK for JavaScript.

Refer to [the documentation](https://sap.github.io/cloud-sdk/docs/js/features/connectivity/generic-http-client) for a description of HTTP Client.

The examples are implemented in [http-client.spec.ts](./http-client.spec.ts).
The purpose of those examples is to provide usable sample code for the examples mentioned the documentation.

## Instructions to run locally

### Install dependencies

```
npm ci
```

### Run tests

They are built as tests which demonstrate how to use the HTTP Client.

To run the tests, execute the following command:

```
npm run test
```

This will start a local [express](https://expressjs.com/)-based HTTP server and perform a few example requests using the HTTP Client.
