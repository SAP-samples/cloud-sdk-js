# Cloud SDK for JS Kubernetes End-2-End Application

This application contains our end-2-end application which we use to test the sdk's functionality in a Kubernetes environment.
The application is deployed together with our Helm chart located [here](https://github.tools.sap/cloudsdk/k8s-sdkjs-chart/blob/main/README.md).

The repositories structure is as following:

- `/approuter` - Contains the approuter, a packaging script and a Dockerfile which is used in the deployment
- `/pipeline` - Contains the pipeline's Dockerfile which contains all tools to run the pipeline
- `/src` - Contains the application's source code with its 3 endpoints for cloud, onpremise and principal propagation
- `/e2e-tests` - Contains the cypress tests that test all endpoints after deployment
- `./github/workflows` - Contains the pipeline that builds, packages, deploys and tests the application
- `Dockerfile` - Packages the application as Dockerimage to be used in Kubernetes

If you want to locally trigger the e2e-tests, create a `cypress.env.json` file in the `/e2e-tests` directory containing the credentials for the IdP in the format:

```
{
  "user": "username",
  "password": "password"
}
```

The entire architecture of this application, together with its dependencies, the connectivity proxy, and the services created by the sap-btp-operator, is depicted in the following architecture diagram:

<img src="./images/architecture_diagramm.svg">
