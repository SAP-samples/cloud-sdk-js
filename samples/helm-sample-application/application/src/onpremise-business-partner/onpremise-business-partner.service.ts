import { Injectable } from '@nestjs/common';
import {
  BusinessPartner,
  opBusinessPartnerService as businessPartnerService,
} from '../generated/op-business-partner-service';
const { businessPartnerApi } = businessPartnerService();

@Injectable()
export class OnpremiseBusinessPartnerService {
  async getFiveBusinessPartners(): Promise<BusinessPartner[]> {
    return businessPartnerApi
      .requestBuilder()
      .getAll()
      .top(5)
      // the destination should point at a onpremise basic authentcation destination
      // Example: <REPLACE-ME>
      .execute({ destinationName: 'myOnpremiseDestination' });
  }
}
