import { Injectable } from '@nestjs/common';
import {
  BusinessPartner,
  opBusinessPartnerService as businessPartnerService,
} from '../generated/op-business-partner-service';
const { businessPartnerApi } = businessPartnerService();

const destinationName: string = process.env.ONPREMISE_DESTINATION;
@Injectable()
export class OnpremiseBusinessPartnerService {
  async getFiveBusinessPartners(): Promise<BusinessPartner[]> {
    return businessPartnerApi
      .requestBuilder()
      .getAll()
      .top(5)
      .execute({ destinationName: destinationName });
  }
}
