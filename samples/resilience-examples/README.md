# SAP Cloud SDK for JS Resilience examples

## Description

This folder contains a few simples examples about resilience and the SDK.
The examples are using well established libraries and are tested for you.
They are meant as a blueprint to illustrate how resilience can be achieved, but there are many other ways out there which could be more fitting in your use case.

- In `src/circuit-breaker.ts` the opossum circuit breaker is wrapped around a request.
- In `src/retry.ts` the async-retry wrapper is used to retry failed requests.

There is always a `*.spec.ts` file next to the examples which shows the actual execution and that the libraries show the expected behaviour.

### Generate oData Client

The [Business Partner service cloud](https://api.sap.com/api/API_BUSINESS_PARTNER/overview) service definitions in `EDMX` format is already downloaded in the folder `resources/service-specs`. The client is generated using the `npm run generate-client` command. This command is executed automatically in the `postinstall` step after you execute `npm i `.

**Note** These service is licensed under the terms of [SAP API Information License](../../LICENSES/LicenseRef-API-Definition-File-License.txt). This limits its use to development purposes only.