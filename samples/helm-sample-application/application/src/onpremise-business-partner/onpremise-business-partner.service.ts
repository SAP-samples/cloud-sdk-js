import { Injectable } from '@nestjs/common';
import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';

const destinationName: string = process.env.ONPREMISE_DESTINATION;
@Injectable()
export class OnpremiseBusinessPartnerService {
  async getFiveBusinessPartners(): Promise<BusinessPartner[]> {
    return BusinessPartner.requestBuilder()
      .getAll()
      .top(5)
      .execute({ destinationName: destinationName });
  }
}
