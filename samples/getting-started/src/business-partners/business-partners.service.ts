import { Injectable } from '@nestjs/common';
import {
  businessPartnerService,
  BusinessPartner,
} from '@sap/cloud-sdk-vdm-business-partner-service';

@Injectable()
export class BusinessPartnersService {
  async getAllBusinessPartners(): Promise<BusinessPartner[]> {
    const { businessPartnerApi } = businessPartnerService();
    return await businessPartnerApi.requestBuilder().getAll().execute({
      url: 'https://my300098.s4hana.ondemand.com:443/',
      username: 'ODATA_CALLER',
      password: 'ODATA_CALLER',
      //   username: 'CCT_E2E_TEST_USER_SDK',
      //   password: 'CCT_E2E_TEST_USER_SDK',
    });
  }
}
