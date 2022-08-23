const httpClient = require("@sap-cloud-sdk/http-client");
const server = require("./server.ts");

let myApp: any;

const SERVER_PORT = process.env.SERVER_PORT || 8181;

describe("HTTP Client Examples", () => {
  beforeAll(() => {
    myApp = server.app.listen(SERVER_PORT, () => {
      console.log(`Server listening on port ${SERVER_PORT}`);
    });
  });
  afterAll(() => {
    myApp.close();
  });
  it("Show usage of fetchCsrfToken", async () => {
    const csrfTokenResponse = await httpClient.executeHttpRequest(
      {
        url: `http://localhost:${SERVER_PORT}/`,
      },
      {
        method: "post",
        url: "csrf-token",
      },
      {
        fetchCsrfToken: true,
      }
    );

    expect(csrfTokenResponse).toBeDefined();
    expect(csrfTokenResponse.data).toEqual("Request with token");
  });

  it("Show usage of custom parameter encoding function", async () => {
    const myCustomParameterEncodingFunction = function (
      params: Record<string, any>
    ): Record<string, any> {
      const encodedParams: Record<string, any> = {};

      for (const k in params) {
        encodedParams[k] = encodeURI(params[k].toString());
      }

      return encodedParams;
    };

    const encodingResponse = await httpClient.executeHttpRequest(
      {
        url: `http://localhost:${SERVER_PORT}/encoding`,
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
      }
    );

    expect(encodingResponse).toBeDefined();
    expect(encodingResponse.data).toEqual(
      "/encoding?requestParam=a/b%20c&customParam=a/b%20c"
    );
  });

  it("Show usage of request with origin", async () => {
    const originResponse = await httpClient.executeHttpRequestWithOrigin(
      {
        url: `http://localhost:${SERVER_PORT}/`,
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

    expect(originResponse).toBeDefined();
    expect(originResponse.data.apikey).toEqual("custom-header");
    expect(originResponse.data.requestUrl).toEqual(
      "/origin?myParam=custom-param"
    );
  });

  it("Show usage of request with local destination", async () => {
    process.env['destinations'] = `[{"name": "MyLocalDestination", "url": "http://localhost:${SERVER_PORT}"}]`;
    expect(process.env['destinations']).toBeDefined();

    const localDestinationResponse = await httpClient.executeHttpRequest(
      { destinationName: "MyLocalDestination" },
      { method: "get", url: "/ping" }
    );

    expect(localDestinationResponse).toBeDefined();
    expect(localDestinationResponse.data).toEqual("pong");
  });
});
