# Cloud SDK for JS Kubernetes End-2-End Application

This application contains our end-2-end application which we use to test the sdk's functionality in an Kubernetes environment.

The structure is as follows

pipeline - contains docker image for our deployment and test pipeline
src - contains the code of the actual application, without the k8s orchestration
  each subdirectory contains one endpoint

Dockerfile - container the app runs in
.github/workflows - contains the pipeline script
e2e-tests - contains your e2e test, run with cypress
  if you want to locally trigger the e2e-tests, create a `cypress.env.json` file containing the credentials for the IdP in the format (user: <username>, password: <password>)
