import { setTestDestination } from '@sap-cloud-sdk/test-util';
import nock from 'nock';
import {
  BusinessPartner,
  businessPartnerService
} from '@sap/cloud-sdk-vdm-business-partner-service';

export const destinationName = 'MyDestination';
export const destinationUrl = 'http://some.url.com';

export function mockDestination(): void {
  setTestDestination({ name: destinationName, url: destinationUrl });
}

export const sampleResponse = {
  d: {
    results: [{ BusinessPartner: 1234 }]
  }
};

export function mockGetAllRequest(times: number): void {
  nock(destinationUrl).get(/.*/).times(times).reply(200, sampleResponse);
}

export async function getAllBusinessPartner(
  top: number
): Promise<BusinessPartner[]> {
  return businessPartnerService()
    .businessPartnerApi.requestBuilder()
    .getAll()
    .top(top)
    .execute({ destinationName });
}
