import { executeHttpRequest, HttpResponse } from "@sap-cloud-sdk/http-client";

function printResponse(r: HttpResponse) {
  console.log(
    `HTTP Response:\nStatus: ${r.status}\nData: ${JSON.stringify(r.data)}\n`
  );
}

const csrfTokenResponse = await executeHttpRequest(
  {
    url: "http://localhost:3000/csrf-token",
  },
  {
    method: "post",
    url: "http://localhost:3000/csrf-token",
  },
  {
    fetchCsrfToken: true,
  }
);

printResponse(csrfTokenResponse);

const encodingResponse = await executeHttpRequest(
  {
    url: "http://localhost:3000/encoding",
  },
  {
    method: "get",
    params: {
      custom: {
        customParam: "a/b",
      },
      requestConfig: {
        requestParam: "a/b",
      },
    },
  },
  {}
);

printResponse(encodingResponse);
