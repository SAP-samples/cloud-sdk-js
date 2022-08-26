import { Injectable } from '@nestjs/common';
import {
  BusinessPartner,
  cloudBusinessPartnerService as businessPartnerService,
} from '../generated/cloud-business-partner-service';
const { businessPartnerApi } = businessPartnerService();

const destinationName: string = process.env.CLOUD_DESTINATION;
@Injectable()
export class CloudBusinessPartnerService {
  async getFiveBusinessPartners(): Promise<BusinessPartner[]> {
    return businessPartnerApi
      .requestBuilder()
      .getAll()
      .top(5)
      .execute({ destinationName: destinationName });
  }
}
