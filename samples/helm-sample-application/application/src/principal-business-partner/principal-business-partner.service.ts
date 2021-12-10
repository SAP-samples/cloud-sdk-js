import { Injectable } from '@nestjs/common';
import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';
import { retrieveJwt } from '@sap-cloud-sdk/core';
import { Request } from 'express';

const destinationName: string = process.env.PRINCIPAL_PROPAGATION_DESTINATION;
@Injectable()
export class PrincipalBusinessPartnerService {
  async getFiveBusinessPartners(request: Request): Promise<BusinessPartner[]> {
    return BusinessPartner.requestBuilder()
      .getAll()
      .top(5)
      .execute({
        destinationName: destinationName,
        jwt: retrieveJwt(request),
      });
  }
}
