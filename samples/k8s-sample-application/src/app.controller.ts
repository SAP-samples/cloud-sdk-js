import { Controller, Get, Req } from '@nestjs/common';
import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';
import { OnpremiseBusinessPartnerService } from './onpremise-business-partner/onpremise-business-partner.service';
import { AppService } from './app.service';
import { CloudBusinessPartnerService } from './cloud-business-partner/cloud-business-partner.service';
import { PrincipalBusinessPartnerService } from './principal-business-partner/principal-business-partner.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly cloudBusinessPartnerService: CloudBusinessPartnerService,
    private readonly onpremiseBusinessPartnerService: OnpremiseBusinessPartnerService,
    private readonly principalBusinessPartnerService: PrincipalBusinessPartnerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('cloud-business-partner')
  getCloudBusinessPartner(): Promise<BusinessPartner[]> {
    return this.cloudBusinessPartnerService.getFiveBusinessPartners();
  }

  @Get('onpremise-business-partner')
  getOnpremiseBusinessPartner(): Promise<BusinessPartner[]> {
    return this.onpremiseBusinessPartnerService.getFiveBusinessPartners();
  }

  @Get('principal-business-partner')
  getPrincipalBusinessPartner(
    @Req() request: Request,
  ): Promise<BusinessPartner[]> {
    return this.principalBusinessPartnerService.getFiveBusinessPartners(
      request,
    );
  }
}
