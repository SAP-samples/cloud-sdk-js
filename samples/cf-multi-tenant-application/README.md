# SAP Cloud SDK for JavaScript Multi-Tenant Sample Application

## Description

The code sample in this directory is a reference for the [multi-tenant application tutorial](https://sap.github.io/cloud-sdk/docs/js/tutorials/multi-tenant-application).
You need to make adjustments to the code before deployment.
The terms you need to replace are given in all caps and start with _`YOUR_`_ e.g. _`YOUR*REGION`*.

Also, note that the samples here are intended as a didactic example and are not necessarily a best practice.
The repositories' structure is as follows:

- [./multi-tenant-app](./multi-tenant-app) - Contains the code of the multi-tenant application.
  It contains a simple service endpoint and logic to be executed on subscription and unsubscription.
- [./approuter](./approuter) - Contains the approuter necessary to attach JSON web tokens to the application.
- [./service-config](./service-config) - Directory configurations for service instances.

## Requirements

The minimal requirements are:

- A terminal to execute commands
- A recent version of node and npm installed e.g. node 14 and npm 6
- A recent installation of the [Cloud Foundry command line interface](https://developers.sap.com/tutorials/cp-cf-download-cli.html)
- An IDE or a text editor of your choice
- Access to a [SAP Business Technology Platform](https://www.sap.com/products/business-technology-platform.html) account
- Entitlement to use resources like service instance creation and application processing units
- Permission to deploy applications and create service instances

## Download and Deployment

To download the application run:

```
git clone \
  --depth 1  \
  --filter=blob:none  \
  --sparse \
  https://github.com/SAP-samples/cloud-sdk-js.git \
;
cd cloud-sdk-js
git sparse-checkout set samples/cf-multi-tenant-application
```

### Create Services on SAP BTP Cloud Foundry

Before you can deploy the application, you have to create a `destination` and `xsuaa` service instance.
Their name should match the one that is used in the application `manifest.yml`, in this case:

- `destination`
- `xsuaa`

### Deploy the Application to SAP BTP Cloud Foundry

Run `cf push` in the application directory to deploy the application.
Please follow the steps described in the [multi-tenant application tutorial](https://sap.github.io/cloud-sdk/docs/js/tutorials/multi-tenant-application) for the deployment steps of all components.
