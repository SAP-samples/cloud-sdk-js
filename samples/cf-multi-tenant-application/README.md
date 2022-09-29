# SAP Cloud SDK for JavaScript Multi-Tenant Sample Application

The code sample in this directory is a reference for the [multi-tenant application](https://sap.github.io/cloud-sdk/docs/js/tutorials/multi-tenant-application) tutorial.
You need to make adjustments to the code before deployment described in the tutorial.

Also note that the samples here are intended as a didactic example and are not necessary a best practice.

- In the [multi-tenant-app](./multi-tenant-app) directory you find the code of the multi-tenant application.
  It contains a simple service endpoint and logic to executed on subscription and unsubscription.
- The [approuter](./approuter) folder contains the approuter necessary to attach JSON web tokens to the application.
- In the [service-binding](./service-config) directory configurations for service instances are located.
