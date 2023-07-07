# Helm Chart for the Helm Sample Application of the SAP Cloud SDK for JS team
This repository contains the Helm chart for our Helm sample application
It is used in our Kubernetes cluster repository.

The application is designed to be deployable in any environment, Gardener, plain GCP or even Kyma, the only file you have to adapt is the `values.yaml` file.

To deploy it to your cluster, use the default `values.yaml` and change the values template to use your values, afterwards run:

```
helm install e2e-app k8s-e2e-app-helm-<release>.tgz --values `/path/to/values.yaml`
```

To override values in a chart, e.g., to set a specific environement, use the `--set` flag and pass configuration from the command line:

```
helm install e2e-app k8s-e2e-app-helm-<release>.tgz --values `/path/to/values.yaml` --set expose.environment=kyma --set approuter-chart.config.pattern="<YOUR_HOST_NAME>.<YOUR-CLUSTER-DOMAIN>"
```

Almost every aspect of the application is configurable, therefore the potential list of flags you can set is very long, look into the default `values.yaml` for a minimal setup.

Below is a matrix containing flags you can use, whether they are required, optional or optional required, meaning required if a specific optional flag was used.

| name | required | optional | optional required | default | description |
|---|---|---|---|---|---|
| approuter-chart.name | | x | | `approuter-chart` | Name of the chart and all its CRDs |
| approuter-chart.imagePullSecrets.name | x | | | | Name of the secret to pull the approuter image |
| approuter-chart.image.repository | | x | | `docker-cloudsdk.common.repositories.cloud.sap/k8s-approuter` | Name of the image to use |
| approuter-chart.image.tag | | x | | `latest` | Tag of the image |
| approuter-chart.config.json | | x | | The app is served under /backend-app/ | Contains the entire approuter config, can be provided in JSON format, can't be used together with `config.idp` |
| approuter-chart.config.idp | x | | | | Name of the Identity Provider to use, required unless the whole config.json is provided |
| approuter-chart.config.pattern | x | | | | The `TENANT_HOST_PATTERN` to use for your approuter for multi-tenancy |
| approuter-chart.resources.requests.memory | | x | x | `256Mi` | If any resource parameter is given, all have to be used |
| approuter-chart.resources.requests.cpu | | x | x | `500m` | If any resource parameter is given, all have to be used |
| approuter-chart.resources.limits.memory | | x | x | `512Mi` | If any resource parameter is given, all have to be used |
| approuter-chart.resources.limits.cpu | | x | x | `1000m` | If any resource parameter is given, all have to be used |
| approuter-chart.serviceAccount.name | | x | | `default` | Service account to use for the deployment |
| approuter-chart.xsuaaBinding | x | | | | Name of the secret that contains the xsuaa service binding |
| app-chart.name | | x | | `app-chart` | Name of the chart and all its CRDs |
| app-chart.imagePullSecrets.name | x | | | | Name of the secret to pull the app image |
| app-chart.image.repository | | x | | `docker-cloudsdk.common.repositories.cloud.sap/k8s-e2e-app` | Name of the image to use |
| app-chart.image.tag | | x | | `latest` | Tag of the image |
| app-chart.resources.requests.memory | | x | x | `256Mi` | If any resource parameter is given, all have to be used |
| app-chart.resources.requests.cpu | | x | x | `500m` | If any resource parameter is given, all have to be used |
| app-chart.resources.limits.memory | | x | x | `512Mi` | If any resource parameter is given, all have to be used |
| app-chart.resources.limits.cpu | | x | x | `1000m` | If any resource parameter is given, all have to be used |
| app-chart.serviceAccount.name | | x | | `default` | Service account to use for the deployment |
| app-chart.xsuaaBinding | x | | | | Name of the secret that contains the xsuaa service binding |
| app-chart.connectivityBinding | x | | | | Name of the secret that contains the connectivity service binding |
| app-chart.destinationBinding | x | | | | Name of the secret that contains the destination service binding |
| app-chart.cloudDestination | x | | | | Name of a cloud destination |
| app-chart.onPremiseDestination | x | | | | Name of a On-Premise destination |
| app-chart.principalPropagationDestination | x | | | | Name of a principal propagation destination |
| global.serviceAccountName | | x | | `default` | ServiceAccount that is used for all CRDs of the chart |
| expose.enabled | x | | | | Whether to enable an ingress/api-rule true/false |
| expose.name | | x | | `k8s-e2e-app-helm` | Name of the charts CRDs |
| expose.environment | x | | | | Kind of environment, either `gardener`, `kyma` or `generic`, if `generic` is used you will have to specify `expose.ingress.issuer` values |
| expose.ingress.shortRoute | | x | x | | If your exposed route is longer than 64 characters, you have to specify a shorter route, since `letsencrypt` needs one route that is shorter than 64 characters to function, the shortest available route would be your DNS, but only if that route is exposable, if you deploy to Gardener this won't be possible without specifying enviromnment as `gardener` |
| expose.ingress.exposedRoute | x | | | | The route that will point at your approuter |
| expose.ingress.connectivityProxyRoute | | x | x | | If the connectivity proxy doesn't have valid TLS yet, you have to configure it here |
| expose.ingress.secretName | | x | | `tls-secret` | Name of the secret that will contain all certificates |
| expose.ingress.issuer.name | | x | x | `letsencrypt-production` | Name of the issuer to use, if you don't specify a name a letsencrypt issuer will be created |
| expose.ingress.issuer.email | | x | x | | Email that will be used to register to letsencrypt, only required if no `ingress.issuer.name` was provided |
| expose.ingress.issuer.privateKeySecretRef | | x | | `tls-private-key` | Name of the secret that will contain your private key |
| expose.api-rule.host | | x | x | `e2e-app-<YOUR_SUBDOMAIN>` | Hostname for the API Gateway. Required if `expose.environment` is set to `kyma` |
