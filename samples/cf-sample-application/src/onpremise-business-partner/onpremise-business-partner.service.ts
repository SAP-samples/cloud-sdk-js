import { Injectable } from '@nestjs/common';
import {
  BusinessPartner,
  businessPartnerService,
} from '@sap/cloud-sdk-vdm-business-partner-service';
const { businessPartnerApi } = businessPartnerService();

@Injectable()
export class OnpremiseBusinessPartnerService {
  async getFiveBusinessPartners(): Promise<BusinessPartner[]> {
    return businessPartnerApi
      .requestBuilder()
      .getAll()
      .top(5)
      // the destination should point at a onpremise basic authentcation destination
      .execute({ destinationName: '<REPLACE-ME>' });
  }
}
