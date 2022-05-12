# SAP Cloud SDK for JS Cloud Foundry Sample Application

## Description
This repository contains our Cloud Foundry sampe application.

The repositories structure is as following:

- `/approuter` - Contains the approuter, a packaging script and a manifest which is used in the deployment
- `/src` - Contains the application's source code with its 4 endpoints for cloud, onpremise and principal propagation
- `/e2e-tests` - Contains the cypress tests that test all endpoints after deployment
- `manifest.yml` - Manifest to deploy to SAP BTP Cloud Foundry

If you want to locally trigger the e2e-tests, create a `cypress.env.json` file in the `/e2e-tests` directory containing the credentials for the IdP in the format:

```
{
  "user": "username",
  "password": "password"
  "url": "url"
}
```

## Requirements
The minimal requirements are:
- A terminal to execute commands
- A recent version of node and npm installed e.g. node 14 and npm 6
- An IDE or a text editor of your choice

If you want to explore the possibilities beyond local tests you need:
- Access to a [SAP Business Technology Platform](https://www.sap.com/products/business-technology-platform.html) account
- Entitlement to use resources like service instance creation and application processing units
- Permission to deploy applications and create service instances

## Download and Installation
To download the application run:

```
git clone \
  --depth 1  \
  --filter=blob:none  \
  --sparse \
  https://github.com/SAP-samples/cloud-sdk-js.git \
;
cd cloud-sdk-js
git sparse-checkout set samples/cf-sample-application
```

### Create Services on SAP BTP Cloud Foundry
Before you can deploy the aapplication and approuter, you have to create a `destination`, `xsuaa`, and `connectivity` service instance.
Their name should match the one that is used in the `manifest.yml`, in this case:

```
- sample-destination-service
- sample-xsuaa-service
- sample-connectivity-service
```

### Deploy the Approuter and Application to SAP BTP Cloud Foundry
1. Change all occurances of `<REPLACE-ME>` to your respective values, this includes destinations, your Identity Provider (IdP), etc.
2. Run `npm run deploy` in the root, as well as in the `approuter` directory to deploy the application to SAP BTP Cloud Foundry.
3. After both the `approuter` and application are deployed, open the `approuter's` url to access the deployed application.

### Code Placeholders
If anything isn't working as intended, search for `<REPLACE-ME>`, as all parts that have to be adapted contain this placeholder.