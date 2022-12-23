# SAP Cloud SDK for JS Resilience examples

## Description

This folder contains a few simples examples about resilience and the SDK.
It shows the usage of the default middlewares and also how you build your own resilience middleware.

There are custom implementation examples of resilience middlewares in the `resilience.ts`.
You find the usage in the `resilience.spec.ts` file.

### Generate oData Client

The [Business Partner service cloud](https://api.sap.com/api/API_BUSINESS_PARTNER/overview) service definitions in `EDMX` format is already downloaded in the folder `resources/service-specs`. The client is generated using the `npm run generate-client` command. This command is executed automatically in the `postinstall` step after you execute `npm i `.

**Note** These service is licensed under the terms of [SAP API Information License](../../LICENSES/LicenseRef-API-Definition-File-License.txt). This limits its use to development purposes only.
