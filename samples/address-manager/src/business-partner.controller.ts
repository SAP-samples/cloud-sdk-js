import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import {
  BusinessPartner,
  BusinessPartnerAddress,
} from "@sap/cloud-sdk-vdm-business-partner-service";
import { BusinessPartnerService } from "./business-partner.service";

@Controller("business-partners")
export class BusinessPartnerController {
  constructor(
    private readonly businessPartnerService: BusinessPartnerService
  ) {}

  @Get()
  getAllBusinessPartners(): Promise<BusinessPartner[]> {
    return this.businessPartnerService.getAllBusinessPartners();
  }

  @Get("/:id")
  getBusinessPartnerById(@Param("id") id: string): Promise<BusinessPartner> {
    return this.businessPartnerService.getBusinessPartnerById(id);
  }

  @Post("/:id/address")
  @HttpCode(201)
  createAddress(
    @Body() requestBody: Record<string, any>,
    @Param("id") id: string
  ): Promise<BusinessPartnerAddress> {
    return this.businessPartnerService.createAddress(requestBody, id);
  }

  @Put("/:businessPartnerId/address/:addressId")
  updateBusinessPartnerAddress(
    @Body() requestBody: Record<string, any>,
    @Param("businessPartnerId") businessPartnerId: string,
    @Param("addressId") addressId: string
  ): Promise<BusinessPartnerAddress> {
    return this.businessPartnerService.updateAddress(
      requestBody,
      businessPartnerId,
      addressId
    );
  }

  @Delete("/:businessPartnerId/address/:addressId")
  @HttpCode(204)
  deleteBusinessPartnerAddress(
    @Param("businessPartnerId") businessPartnerId: string,
    @Param("addressId") addressId: string
  ): Promise<void> {
    return this.businessPartnerService.deleteAddress(
      businessPartnerId,
      addressId
    );
  }
}
