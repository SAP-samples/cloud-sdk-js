import {
  executeHttpRequest,
  executeHttpRequestWithOrigin,
  HttpResponse,
  ParameterEncoder,
} from "@sap-cloud-sdk/http-client";
import { setGlobalLogLevel, createLogger } from "@sap-cloud-sdk/util";

const logger = createLogger("http-client-examples");

// Change to 'debug' to see more about http client internals
setGlobalLogLevel("info");

function printResponse(r: HttpResponse) {
  logger.info(
    `HTTP Response:\nStatus:\t${r.status}\nData:\t${JSON.stringify(
      r.data
    )}\n====\n`
  );
}

const csrfTokenResponse = await executeHttpRequest(
  {
    url: "http://localhost:3000/",
  },
  {
    method: "post",
    url: "csrf-token",
  },
  {
    fetchCsrfToken: true,
  }
);

printResponse(csrfTokenResponse);

const myCustomParameterEncodingFunction: ParameterEncoder = function (
  params: Record<string, any>
): Record<string, any> {
  logger.info("Original params", JSON.stringify(params));

  const encodedParams: Record<string, any> = {};

  for (const k in params) {
    encodedParams[k] = encodeURI(params[k].toString());
  }

  logger.info("Encoded params", JSON.stringify(encodedParams));

  return encodedParams;
};

const encodingResponse = await executeHttpRequest(
  {
    url: "http://localhost:3000/encoding",
  },
  {
    method: "get",
    params: {
      custom: {
        customParam: "a/b c",
      },
      requestConfig: {
        requestParam: "a/b c",
      },
    },
    parameterEncoder: myCustomParameterEncodingFunction,
  },
  {}
);

printResponse(encodingResponse);

const originResponse = await executeHttpRequestWithOrigin(
  {
    url: "http://localhost:3000/",
  },
  {
    method: "get",
    url: "/origin",
    headers: {
      custom: { apiKey: "custom-header" },
      requestConfig: { apiKey: "default-header" },
    },
    params: {
      custom: { myParam: "custom-param" },
      requestConfig: { myParam: "default-param" },
    },
  }
);

printResponse(originResponse);
