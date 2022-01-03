import { Injectable } from '@nestjs/common';
import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';

@Injectable()
export class CloudBusinessPartnerService {
  async getFiveBusinessPartners(): Promise<BusinessPartner[]> {
    return BusinessPartner.requestBuilder()
      .getAll()
      .top(5)
      .execute({ destinationName: 'YOUR-CLOUD-BASIC-AUTH-DESTINATION' });
  }
}
