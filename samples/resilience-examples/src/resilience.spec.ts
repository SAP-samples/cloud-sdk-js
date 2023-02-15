import nock from 'nock';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';
import { retry, resilience, timeout } from '@sap-cloud-sdk/resilience';
import { createLogger } from '@sap-cloud-sdk/util';
import { fallbackMiddleware, loggingMiddleware } from './resilience';
import { cloudBusinessPartnerService } from './generated/cloud-business-partner-service';

/**
 * These tests show the usage of the  default resilience middlewares together with custom ones.
 * Mainly the untyped `executeHttpRequest()` function is used because the request mocking is easier.
 * The effect of the middleware is the same for the typed or untyped client.
 */
describe('resilience', () => {
  it('uses the default resilience middleware with the typed client', async () => {
    // Mock response for test
    nock('http://flaky-system.com')
      .get(/.*/)
      .delay(1000)
      .reply(200, {}) // will fail due to timeout
      .get(/.*/)
      .reply(503, {}) // just fails
      .get(/.*/)
      .reply(200, { d: { results: [{ BusinessPartner: '123' }] } }); // works in the end to test the retry

    // Add a timeout (short for the test), circuit breaker and retry to the request
    const { businessPartnerApi } = cloudBusinessPartnerService();
    const response = await businessPartnerApi
      .requestBuilder()
      .getAll()
      .middleware(resilience({ retry: 2, timeout: 500 }))
      .execute({ url: 'http://flaky-system.com' });
    expect(response).toEqual([{ businessPartner: '123' }]);
  }, 10000);

  it('uses the default resilience middleware with the generic client', async () => {
    // Mock response for test
    nock('http://falky-system.com')
      .get(/.*/)
      .delay(1000)
      .reply(200, {}) // will fail due to timeout
      .get(/.*/)
      .reply(503, {}) // just fails
      .get(/.*/)
      .reply(200, 'Puh, the retry saved it.'); // works in the end to test the retry

    // Add a timeout (short for the test), circuit breaker and retry to the request
    const response = await executeHttpRequest(
      { url: 'http://falky-system.com' },
      { method: 'get', middleware: resilience({ retry: 2, timeout: 500 }) }
    );
    expect(response.data).toEqual('Puh, the retry saved it.');
  }, 10000);

  it('uses the custom fallback middleware if system is down.', async () => {
    // Mock response for test
    nock('http://failing-system.com').get(/.*/).reply(503);
    nock('http://working-system.com')
      .get(/.*/)
      .reply(200, 'Puh, fallback system is working.');

    // Add the custom middleware to the request to try the fallback system in case of errors
    const response = await executeHttpRequest(
      { url: 'http://failing-system.com' },
      {
        method: 'get',
        middleware: [fallbackMiddleware({ url: 'http://working-system.com' })]
      }
    );
    expect(response.data).toEqual('Puh, fallback system is working.');
  });

  it('uses the custom fallback middleware together with a timeout.', async () => {
    // Mock response for test
    nock('http://slow-system.com').get(/.*/).delay(1000).reply(200, {});
    nock('http://working-system.com')
      .get(/.*/)
      .reply(200, 'Puh, fallback system is working.');

    // Add a timeout and the custom fallback middleware to a request.
    const response = await executeHttpRequest(
      { url: 'http://slow-system.com' },
      {
        method: 'get',
        middleware: [
          fallbackMiddleware({ url: 'http://working-system.com' }),
          timeout(500)
        ]
      }
    );
    expect(response.data).toEqual('Puh, fallback system is working.');
  });

  it('uses the custom logging middleware.', async () => {
    // Mock response for test
    nock('http://unauthorized-system.com').get(/.*/).reply(403);
    const logger = createLogger('http-logs');
    const logSpy = jest.spyOn(logger, 'error');

    // Add the custom logging middleware
    await expect(
      executeHttpRequest(
        {
          url: 'http://unauthorized-system.com',
          username: 'Peter',
          password: 'doesNotMatter'
        },
        { method: 'get', middleware: [loggingMiddleware()] }
      )
    ).rejects.toThrowError(/403/);
    expect(logSpy).toHaveBeenCalledWith(
      'The user Peter is not authorized to do the request.'
    );
  });

  it('skips other middlewares in the list if the logging middleware logs an unauthorized request.', async () => {
    // Mock response for test
    const mock = nock('http://unauthorized-system.com')
      .get(/.*/)
      .times(2)
      .reply(403)
      .get(/.*/)
      .times(2)
      .reply(200);

    // Add a retry and the custom logging middleware
    await expect(
      executeHttpRequest(
        {
          url: 'http://unauthorized-system.com',
          username: 'Peter',
          password: 'doesNotMatter'
        },
        { method: 'get', middleware: [retry(), loggingMiddleware()] }
      )
    ).rejects.toThrowError(/403/);
    expect(mock.isDone()).toBe(false);
    nock.cleanAll();
  });
});
