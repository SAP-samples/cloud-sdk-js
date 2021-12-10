import { Injectable } from '@nestjs/common';
import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';
import { retrieveJwt } from '@sap-cloud-sdk/core';
import { Request } from 'express';

@Injectable()
export class PrincipalBusinessPartnerService {
  async getFiveBusinessPartners(request: Request): Promise<BusinessPartner[]> {
    return BusinessPartner.requestBuilder()
      .getAll()
      .top(5)
      .execute({
        destinationName: 'QW9-HTTP-PRINCIP-PROP',
        jwt: retrieveJwt(request),
      });
  }
}
