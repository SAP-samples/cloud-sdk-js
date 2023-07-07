# SAP Cloud SDK for JS Kubernetes Sample Application

## Description
This repository contains our Kubernetes Sample Application.

The repositories structure is as following:

- `/approuter` - Contains the approuter, a packaging script and a Dockerfile which is used in the deployment
- `/pipeline` - Contains the pipeline's Dockerfile which contains all tools to run the pipeline
- `/src` - Contains the application's source code with its 4 endpoints for cloud, onpremise and principal propagation
- `/e2e-tests` - Contains the cypress tests that test all endpoints after deployment
- `./github/workflows` - Contains the pipeline that builds, packages, deploys, and tests the application
- `Dockerfile` - Packages the application as Dockerimage to be used in Kubernetes

If you want to locally trigger the e2e-tests, create a `cypress.env.json` file in the `/e2e-tests` directory containing the credentials for the IdP in the format:

```
{
  "username": "username",
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
- Permission to create service instances
- Access to a `Docker` repository
- A Kubernetes Cluster which runs:
  - The SAP BTP Operator
  - The SAP Connectivity Proxy
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
git sparse-checkout set samples/k8s-sample-application
```

### Generate oData Client

The following service definitions in `EDMX` format are already downloaded in the folder `resources/service-specs`:
- [Business Partner service onPremise](https://api.sap.com/api/OP_API_BUSINESS_PARTNER_SRV/overview)
- [Business Partner service cloud](https://api.sap.com/api/API_BUSINESS_PARTNER/overview)

The clients are generated using the `npm run generate-client` command. This command is executed automatically in the `postinstall` step after you execute `npm i `.

**Note** These services are licensed under the terms of [SAP API Information License](../../LICENSES/LicenseRef-API-Definition-File-License.txt). This limits their use to development purposes only.


### Deploy to Docker
1. In the `package.json`, change the `deploy:docker` and `deploy:pipeline` scripts to point at your docker repository.
2. Change the the `deploy:docker` script in the approuter's `package.json` to point at your docker repository.
3. Change the `xs-app.json` in the approuter directory to use either an IdP of your choice, or no IdP at all.
4. Deploy the Docker images to your repository with `npm run deploy:docker` and `npm run deploy:pipeline` in case you want to use the pipeline.

### Deploy to Kubernetes
1. Update the `deployment.yml` to use your Docker images and the `ingress.yml` to use the domain associated with your cluster.
2. Use the same domain in the `TENANT_HOST_PATTERN` in the approuter's `deployment.yml` which you specified in the `ingress.yml`.
3. Deploy the services in `k8s_files/operator/services`.
4. Now you can deploy the application and approuter with the Kubernetes files in `k8s_files/app`, `k8s_files/approuter` and the `ingress.yml` with `kubectl apply -f`.

### Code Placeholders
If anything isn't working as intended, search for `<REPLACE-ME>`, as all parts that have to be adapted contain this placeholder.

For more detailed information on Kubernetes deployment, check out our [Kubernetes migration guide](https://sap.github.io/cloud-sdk/docs/js/guides/migrate-sdk-application-from-btp-cf-to-kubernetes).
