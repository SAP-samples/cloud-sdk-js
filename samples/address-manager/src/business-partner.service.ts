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

/**
 * Service implementation of address API.
 */
@Injectable()
export class BusinessPartnerService {
  /**
   * Gets a list of all business partners.
   * @returns List of business partner.
   */
  async getAllBusinessPartners(): Promise<BusinessPartner[]> {
    return businessPartnerApi
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
  }

  /**
   * Get a business partner by ID.
   * @param id - ID of the business partner to be returned.
   * @returns The business partner with the given ID.
   */
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

  /**
   * Creates an address for a business partner.
   * @param address - Address which is added to the business partner.
   * @param id - ID of the business partner.
   * @returns The address which was created.
   */
  public createAddress(
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

  /**
   * Updates an address of a business partner.
   * @param address - New address information after update. Existing values are overwritten, new onew are added.
   * @param businessPartner - ID of business partner whose address is updated.
   * @param addressId - ID of address which is updated.
   * @returns - The address after update.
   */
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

  /**
   * Deletes an address of a business partner.
   * @param businessPartner - ID of the business partner to be updated.
   * @param addressId - ID of address to be deleted.
   * @returns - Void.
   */
  deleteAddress(businessPartner: string, addressId: string): Promise<void> {
    return businessPartnerAddressApi
      .requestBuilder()
      .delete(businessPartner, addressId)
      .execute({ url: "http://localhost:3000" });
  }
}
