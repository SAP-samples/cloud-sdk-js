import {
  BusinessPartner,
  cloudBusinessPartnerService as businessPartnerService
} from './generated/cloud-business-partner-service'
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
