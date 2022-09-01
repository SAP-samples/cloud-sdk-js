import {
  executeHttpRequest,
  executeHttpRequestWithOrigin,
  ParameterEncoder
} from '@sap-cloud-sdk/http-client';

/* 

This spec file includes usage examples for the HTTP client that make use of the httpbin.org service.
The examples in this file should be exactly the same as on https://sap.github.io/cloud-sdk/docs/js/features/connectivity/generic-http-client

*/

describe('HTTP Client Usage Examples using httpbin.org', () => {
  it('Show simple HTTP Post without fetchCsrfToken', async () => {
    const response = await executeHttpRequest(
      {
        url: `https://httpbin.org/post`
      },
      {
        method: 'post'
      },
      {
        fetchCsrfToken: false
      }
    );
    expect(response).toBeDefined();
    expect(response.status).toBe(200);
  });

  it('Customized Parameter Encoding', async () => {
    const myCustomParameterEncodingFunction: ParameterEncoder = function (
      params: Record<string, any>
    ): Record<string, any> {
      const encodedParams: Record<string, any> = {};

      for (const k in params) {
        // Customize your required encoding logic here
        encodedParams[k] = params[k].toString().replace('x', 'y');
      }

      return encodedParams;
    };

    const response = await executeHttpRequest(
      {
        url: 'https://httpbin.org/anything'
      },
      {
        method: 'get',
        params: {
          customParam: 'a/bx',
          requestParam: 'a/bx'
        },
        // Pass your custom encoding function
        parameterEncoder: myCustomParameterEncodingFunction
      }
    );

    expect(response.data.args).toEqual({
      customParam: 'a/by',
      requestParam: 'a/by'
    });
  });

  it('executeHttpRequestWithOrigin', async () => {
    const response = await executeHttpRequestWithOrigin(
      {
        url: 'https://httpbin.org/anything'
      },
      {
        method: 'get',
        headers: {
          custom: { apiKey: 'custom-header' },
          requestConfig: { apiKey: 'default-header' }
        },
        params: {
          custom: { myParam: 'custom-param' },
          requestConfig: { myParam: 'default-param' }
        }
      }
    );

    expect(response.request.path).toEqual('/anything?myParam=custom-param');
    expect(response.data.args).toEqual({
      myParam: 'custom-param'
    });
  });
});
