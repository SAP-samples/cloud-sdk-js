import { Injectable } from '@nestjs/common';
import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';

const destinationName: string = process.env.CLOUD_DESTINATION;
@Injectable()
export class CloudBusinessPartnerService {
  async getFiveBusinessPartners(): Promise<BusinessPartner[]> {
    return BusinessPartner.requestBuilder()
      .getAll()
      .top(5)
      .execute({ destinationName: destinationName });
  }
}
