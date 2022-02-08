import { BusinessPartner, businessPartnerService } from '@sap/cloud-sdk-vdm-business-partner-service';
import retry from 'async-retry';
import { destinationName } from './test-util';

export function getAllBusinessPartners(top: number): () => Promise<BusinessPartner[]>{
    return ()=> businessPartnerService().businessPartnerApi.requestBuilder().getAll().top(top).execute({ destinationName });
}

const options = {
    retries : 2,
    minTimeout: 500
};

export function getAllBusinessPartnerWithRetry(top: number): Promise<BusinessPartner[]>{
    return retry(getAllBusinessPartners(top),options);
}
