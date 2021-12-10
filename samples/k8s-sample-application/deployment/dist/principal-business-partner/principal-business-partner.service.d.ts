import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';
import { Request } from 'express';
export declare class PrincipalBusinessPartnerService {
    getFiveBusinessPartners(request: Request): Promise<BusinessPartner[]>;
}
