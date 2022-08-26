import { Injectable } from '@nestjs/common';
import {
  BusinessPartner,
  opBusinessPartnerService as businessPartnerService,
} from '../generated/op-business-partner-service';
import { retrieveJwt } from '@sap-cloud-sdk/connectivity';
import { Request } from 'express';
const { businessPartnerApi } = businessPartnerService();

const destinationName: string = process.env.PRINCIPAL_PROPAGATION_DESTINATION;
@Injectable()
export class PrincipalBusinessPartnerService {
  async getFiveBusinessPartners(request: Request): Promise<BusinessPartner[]> {
    return businessPartnerApi
      .requestBuilder()
      .getAll()
      .top(5)
      .execute({
        destinationName: destinationName,
        jwt: retrieveJwt(request),
      });
  }
}
