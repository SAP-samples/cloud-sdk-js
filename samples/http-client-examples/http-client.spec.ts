import {
  executeHttpRequest,
  executeHttpRequestWithOrigin
} from '@sap-cloud-sdk/http-client';
import app from './server';

/* 

This spec file includes usage examples for the HTTP client that make use of the HTTP server in `server.ts`.
The server is automatically started and stopped by the test runner.

*/

let myApp: any;

const SERVER_PORT = process.env.SERVER_PORT || 8181;

describe('HTTP Client Usage Examples', () => {
  beforeAll(() => {
    myApp = app.listen(SERVER_PORT, () => {
      console.log(`Server listening on port ${SERVER_PORT}`);
    });
  });
  afterAll(() => {
    myApp.close();
  });
  it('Show simple usage of HTTP GET', async () => {
    const response = await executeHttpRequest(
      {
        url: `http://localhost:${SERVER_PORT}/`
      },
      {
        method: 'GET'
      }
    );

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
  });
  it('Show usage of fetchCsrfToken (manually enabled)', async () => {
    const response = await executeHttpRequest(
      {
        url: `http://localhost:${SERVER_PORT}/`
      },
      {
        method: 'post',
        url: 'csrf-token'
      },
      {
        fetchCsrfToken: true
      }
    );

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.data).toEqual('Request with token');
  });

  it('Show usage of fetchCsrfToken (automatically enabled)', async () => {
    const response = await executeHttpRequest(
      {
        url: `http://localhost:${SERVER_PORT}/`
      },
      {
        method: 'post',
        url: 'csrf-token'
      }
    );

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.data).toEqual('Request with token');
  });

  it('Show post request without fetching a Csrf Token', async () => {
    const response = await executeHttpRequest(
      {
        url: `http://localhost:${SERVER_PORT}/`
      },
      {
        method: 'post',
        url: 'post-without-csrf-token'
      },
      {
        fetchCsrfToken: false
      }
    );

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
  });

  it('Show usage of custom parameter encoding function', async () => {
    const myCustomParameterEncodingFunction = function (
      params: Record<string, any>
    ): Record<string, any> {
      const encodedParams: Record<string, any> = {};

      for (const k in params) {
        encodedParams[k] = encodeURI(params[k].toString());
      }

      return encodedParams;
    };

    const response = await executeHttpRequest(
      {
        url: `http://localhost:${SERVER_PORT}/encoding`
      },
      {
        method: 'get',
        params: {
          custom: {
            customParam: 'a/b c>d<e`f\\g'
          },
          requestConfig: {
            requestParam: 'a/b c>d<e`f\\g'
          }
        },
        parameterEncoder: myCustomParameterEncodingFunction
      }
    );

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.data).toEqual(
      '/encoding?requestParam=a/b%20c%3Ed%3Ce%60f%5Cg&customParam=a/b%20c%3Ed%3Ce%60f%5Cg'
    );
  });

  it('Show usage of request with origin', async () => {
    const response = await executeHttpRequestWithOrigin(
      {
        url: `http://localhost:${SERVER_PORT}/`
      },
      {
        method: 'get',
        url: '/origin',
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

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.data.apikey).toEqual('custom-header');
    expect(response.data.requestUrl).toEqual('/origin?myParam=custom-param');
  });

  it('Show usage of request with local destination', async () => {
    process.env[
      'destinations'
    ] = `[{"name": "MyLocalDestination", "url": "http://localhost:${SERVER_PORT}"}]`;
    expect(process.env['destinations']).toBeDefined();

    const response = await executeHttpRequest(
      { destinationName: 'MyLocalDestination' },
      { method: 'get', url: '/ping' }
    );

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.data).toEqual('pong');
  });
});
