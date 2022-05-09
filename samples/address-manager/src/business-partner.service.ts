import { Injectable } from "@nestjs/common";
import {
  BusinessPartner,
  BusinessPartnerAddress,
  businessPartnerService,
} from "@sap/cloud-sdk-vdm-business-partner-service";
import * as dotenv from "dotenv";

dotenv.config();
const { businessPartnerApi, businessPartnerAddressApi } =
  businessPartnerService();

@Injectable()
export class BusinessPartnerService {
  async getAllBusinessPartners(): Promise<BusinessPartner[]> {
    const result = await businessPartnerApi
      .requestBuilder()
      .getAll()
      .select(
        businessPartnerApi.schema.BUSINESS_PARTNER,
        businessPartnerApi.schema.FIRST_NAME,
        businessPartnerApi.schema.LAST_NAME,
        businessPartnerApi.schema.TO_BUSINESS_PARTNER_ADDRESS.select(
          businessPartnerAddressApi.schema.BUSINESS_PARTNER,
          businessPartnerAddressApi.schema.ADDRESS_ID
        )
      )
      .filter(businessPartnerApi.schema.BUSINESS_PARTNER_CATEGORY.equals("1"))
      .execute({ url: "http://localhost:3000" });
    return result.filter(
      (bp) =>
        bp.toBusinessPartnerAddress && bp.toBusinessPartnerAddress.length > 0
    );
  }

  updateAddress(
    address: Record<string, any>,
    businessPartner: string,
    addressId: string
  ): Promise<BusinessPartnerAddress> {
    const businessPartnerAddress = businessPartnerAddressApi
      .entityBuilder()
      .fromJson({ businessPartner, addressId, ...address });
    return businessPartnerAddressApi
      .requestBuilder()
      .update(businessPartnerAddress)
      .execute({ url: "http://localhost:3000" });
  }

  deleteAddress(businessPartner: string, addressId: string): Promise<void> {
    return businessPartnerAddressApi
      .requestBuilder()
      .delete(businessPartner, addressId)
      .execute({ url: "http://localhost:3000" });
  }

  createAddress(
    address: Record<string, any>,
    id: string
  ): Promise<BusinessPartnerAddress> {
    const businessPartnerAddress = businessPartnerAddressApi
      .entityBuilder()
      .fromJson({ businessPartner: id, ...address });
    return businessPartnerAddressApi
      .requestBuilder()
      .create(businessPartnerAddress)
      .execute({ url: "http://localhost:3000" });
  }

  getBusinessPartnerById(id: string): Promise<BusinessPartner> {
    return businessPartnerApi
      .requestBuilder()
      .getByKey(id)
      .select(
        businessPartnerApi.schema.BUSINESS_PARTNER,
        businessPartnerApi.schema.FIRST_NAME,
        businessPartnerApi.schema.LAST_NAME,
        businessPartnerApi.schema.TO_BUSINESS_PARTNER_ADDRESS.select(
          businessPartnerAddressApi.schema.BUSINESS_PARTNER,
          businessPartnerAddressApi.schema.ADDRESS_ID,
          businessPartnerAddressApi.schema.POSTAL_CODE,
          businessPartnerAddressApi.schema.CITY_NAME,
          businessPartnerAddressApi.schema.STREET_NAME,
          businessPartnerAddressApi.schema.HOUSE_NUMBER
        )
      )
      .execute({ url: "http://localhost:3000" });
  }
}
