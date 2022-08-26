import { Injectable } from '@nestjs/common';
import {
  BusinessPartner,
  cloudBusinessPartnerService as businessPartnerService,
} from '../generated/cloud-business-partner-service';
const { businessPartnerApi } = businessPartnerService();

@Injectable()
export class CloudBusinessPartnerService {
  async getFiveBusinessPartners(): Promise<BusinessPartner[]> {
    return businessPartnerApi
      .requestBuilder()
      .getAll()
      .top(5)
      // the destination should point at a cloud basic auth destination
      // Example: <REPLACE-ME>
      .execute({ destinationName: 'myCloudDestination' });
  }
}
