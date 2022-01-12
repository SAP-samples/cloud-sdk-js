# CAP + SAP Cloud SDK for JS Cloud Foundry End-2-End Application

## Description
This repository contains a CAP-based application which we use to test the SAP Cloud SDK functionality in a SAP BTP Cloud Foundry environment.

The repositories' structure is as following:

- `/src` - Contains the application's source code with a CAP service handler implementation
- `/srv` - Contains the CDS rervice definitions and implementations
- `/db` - Contains CDS Domain Models and database-related stuff
- `Jenkinsfile` - Contains a Jenkins pipeline
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
git sparse-checkout set samples/cds-sample-application
```

### Create Services on SAP BTP Cloud Foundry
Before you can deploy the application, you have to create a `destination`and `xsuaa` service instance.
Their name should match the one that is used in the `manifest.yml`, in this case:
- `destination-service`
- `xsuaa-service`

### Deploy the Application to SAP BTP Cloud Foundry
Run `npm run deploy` in the root to deploy the application to SAP BTP Cloud Foundry.