import { Injectable } from '@nestjs/common';
import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';

@Injectable()
export class OnpremiseBusinessPartnerService {
  async getFiveBusinessPartners(): Promise<BusinessPartner[]> {
    return BusinessPartner.requestBuilder()
      .getAll()
      .top(5)
      .execute({ destinationName: 'YOUR-ONPREMISE-BASIC-AUTH-DESTINATION' });
  }
}
