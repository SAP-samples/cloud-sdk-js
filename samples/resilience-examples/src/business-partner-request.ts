import {
  BusinessPartner,
  businessPartnerService
} from '@sap/cloud-sdk-vdm-business-partner-service';
import { destinationName } from './test-util';

export async function getAllBusinessPartner(
  filterTop: number
): Promise<BusinessPartner[]> {
  return businessPartnerService()
    .businessPartnerApi.requestBuilder()
    .getAll()
    .top(filterTop)
    .execute({ destinationName });
}
