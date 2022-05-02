import { Controller, Get, HttpException } from '@nestjs/common';
import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';
import { BusinessPartnersService } from './business-partners.service';

@Controller('business-partners')
export class BusinessPartnersController {
  constructor(private businessPartnerService: BusinessPartnersService) {}

  @Get()
  async getBusinessPartners(): Promise<BusinessPartner[]> {
    return await this.businessPartnerService
      .getAllBusinessPartners()
      .catch((error) => {
        throw new HttpException(
          `Failed to get business partners - ${error.message}`,
          500,
        );
      });
  }
}
