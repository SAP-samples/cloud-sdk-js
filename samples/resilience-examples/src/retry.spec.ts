import { unmockAllTestDestinations } from '@sap-cloud-sdk/test-util';
import nock from 'nock';
import { getAllBusinessPartners, getAllBusinessPartnerWithRetry } from './retry';
import { destinationUrl, mockDestination, mockGetAllRequest } from './test-util';

describe('retry',()=>{
    beforeAll(()=>{
       mockDestination();
    });

    beforeEach(()=>{
    nock(destinationUrl)
        .get(/.*/)
        .times(2)
        .reply(500);

     mockGetAllRequest(1);
    });

    afterEach(()=>{
        nock.cleanAll();
    });

    afterAll(()=>{
        unmockAllTestDestinations();
    });

    it('fails without the retry.',async ()=>{
        await expect(getAllBusinessPartners(1)()).rejects.toThrowError(`get request to ${destinationUrl}/sap/opu/odata/sap/API_BUSINESS_PARTNER failed!`);
    });

    it('resolves with retry',async ()=>{
        // The mock will return after two failed attempts
        const actual = await getAllBusinessPartnerWithRetry(1);
        expect(actual.length).toBe(1);
    });
});
