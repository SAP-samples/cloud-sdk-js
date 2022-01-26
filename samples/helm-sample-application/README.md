# SAP Cloud SDK for JS Kubernetes End-2-End Application
This directory is structured the following way:

- `./application` contains our end-2-end application, which we use to test the SAP Cloud SDK functionality in Kubernetes
- `./helm-chart` contains the helm chart, which we use to deploy the application
- `./sap-btp-operator` contains the helm chart of the SAP BTP Operator, together with a self-signed issuer, all services which are related to our application, as well as a simple `values.yaml` for the helm chart

```bash
git clone \
  --depth 1  \
  --filter=blob:none  \
  --sparse \
  https://github.com/SAP-samples/cloud-sdk-js.git \
;
cd cloud-sdk-js
git sparse-checkout set samples/helm-sample-application
```

To deploy the application, follow the guidelines in the [application directory](./application/README.md).

