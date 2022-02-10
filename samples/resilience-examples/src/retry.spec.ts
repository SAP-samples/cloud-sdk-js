import { unmockAllTestDestinations } from '@sap-cloud-sdk/test-util';
import nock from 'nock';
import { createLogger } from '@sap-cloud-sdk/util';
import { getAllBusinessPartnerWithRetry } from './retry';
import {
  destinationUrl,
  mockDestination,
  mockGetAllRequest
} from './test-util';
import { getAllBusinessPartner } from './business-partner-request';

describe('retry', () => {
  beforeAll(() => {
    mockDestination();
  });

  beforeEach(() => {
    nock(destinationUrl).get(/.*/).times(2).reply(500);

    mockGetAllRequest(1);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  afterAll(() => {
    unmockAllTestDestinations();
  });

  it('rejects without the retry.', async () => {
    await expect(getAllBusinessPartner(1)).rejects.toThrowError(
      `get request to ${destinationUrl}/sap/opu/odata/sap/API_BUSINESS_PARTNER failed!`
    );
  });

  it('resolves with retry', async () => {
    // The mock will return after two failed attempts
    const actual = await getAllBusinessPartnerWithRetry(1);
    expect(actual.length).toBe(1);
  });

  it('does not retry on 403 error', async () => {
    nock.cleanAll();
    nock(destinationUrl).get(/.*/).times(1).reply(401);

    const logger = createLogger('retry');
    const spy = jest.spyOn(logger, 'warn');
    await expect(getAllBusinessPartnerWithRetry(1)).rejects.toThrowError(
      `get request to ${destinationUrl}/sap/opu/odata/sap/API_BUSINESS_PARTNER failed!`
    );

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      'Request failed with status 401 - no retry necessary.'
    );
  });
});
