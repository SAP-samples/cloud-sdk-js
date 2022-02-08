import { unmockAllTestDestinations } from '@sap-cloud-sdk/test-util';
import nock from 'nock';
import { createLogger } from '@sap-cloud-sdk/util';
import { getAllBusinessPartnerWithCircuitBreaker } from './circuit-breaker';
import { mockDestination, mockGetAllRequest } from './test-util';

describe('circuit-breaker', () => {
  const numberWorkingRequests = [1, 2, 3, 4, 5];

  const logger = createLogger('circuit-breaker');

  beforeAll(() => {
    mockDestination();
  });

  beforeEach(() => {
    mockGetAllRequest(numberWorkingRequests.length);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  afterAll(() => {
    unmockAllTestDestinations();
  });

  it('does not open the circuit breaker for no failed requests.', async () => {
    const spy = jest.spyOn(logger, 'warn');
    await Promise.all(
      numberWorkingRequests.map(() =>
        getAllBusinessPartnerWithCircuitBreaker(1)
      )
    );
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('opens the circuit after a few failed requests', async () => {
    const spy = jest.spyOn(logger, 'warn');

    // The circuit breaker was configured to have 80% failure threshold. So 1 / 6 requests failing is enough to open the circuit
    await Promise.all(
      [...numberWorkingRequests, 6].map(() =>
        getAllBusinessPartnerWithCircuitBreaker(1)
      )
    );
    expect(spy).toHaveBeenCalledWith(
      'Request failed to many times. Circuit breaker is open.'
    );

    // Circuit breaker is now open and the request is not executed.
    await expect(
      getAllBusinessPartnerWithCircuitBreaker(1)
    ).resolves.not.toThrow();
  });
});
