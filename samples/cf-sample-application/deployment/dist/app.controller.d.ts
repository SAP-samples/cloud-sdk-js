import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';
import { OnpremiseBusinessPartnerService } from './onpremise-business-partner/onpremise-business-partner.service';
import { AppService } from './app.service';
import { CloudBusinessPartnerService } from './cloud-business-partner/cloud-business-partner.service';
import { PrincipalBusinessPartnerService } from './principal-business-partner/principal-business-partner.service';
import { Request } from 'express';
import { LoadtestService } from './loadtest/loadtest.service';
export declare class AppController {
    private readonly appService;
    private readonly cloudBusinessPartnerService;
    private readonly onpremiseBusinessPartnerService;
    private readonly principalBusinessPartnerService;
    private readonly loadtestService;
    constructor(appService: AppService, cloudBusinessPartnerService: CloudBusinessPartnerService, onpremiseBusinessPartnerService: OnpremiseBusinessPartnerService, principalBusinessPartnerService: PrincipalBusinessPartnerService, loadtestService: LoadtestService);
    getHello(): string;
    getCloudBusinessPartner(): Promise<BusinessPartner[]>;
    getOnpremiseBusinessPartner(): Promise<BusinessPartner[]>;
    getPrincipalBusinessPartner(request: Request): Promise<BusinessPartner[]>;
    calculateExpensiveNumber(): number;
}
