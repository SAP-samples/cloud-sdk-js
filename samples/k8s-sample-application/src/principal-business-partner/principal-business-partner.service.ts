import { Injectable } from '@nestjs/common';
import {
  BusinessPartner,
  businessPartnerService,
} from '@sap/cloud-sdk-vdm-business-partner-service';
import { retrieveJwt } from '@sap-cloud-sdk/connectivity';
import { Request } from 'express';
const { businessPartnerApi } = businessPartnerService();

@Injectable()
export class PrincipalBusinessPartnerService {
  async getFiveBusinessPartners(request: Request): Promise<BusinessPartner[]> {
    return businessPartnerApi
      .requestBuilder()
      .getAll()
      .top(5)
      .execute({
        // the destination should point at a principal propagation destination
        // Example: <REPLACE-ME>
        destinationName: 'myPrincipalPropagationDestination',
        jwt: retrieveJwt(request),
      });
  }
}
