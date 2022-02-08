import { BusinessPartner, businessPartnerService } from '@sap/cloud-sdk-vdm-business-partner-service';
import CircuitBreaker from 'opossum';
import { createLogger } from '@sap-cloud-sdk/util';
import { destinationName } from './test-util';

const logger = createLogger('circuit-breaker');

function getAllBusinessPartner(top: number): Promise<BusinessPartner[]>{
    return businessPartnerService().businessPartnerApi.requestBuilder().getAll().top(top).execute({ destinationName });
}

const breakerOptions = {
    timeout: 3000,
    errorThresholdPercentage: 80,
    resetTimeout: 30000
};

// Create a new circuit breaker around the asyn method
const breaker = new CircuitBreaker(getAllBusinessPartner,breakerOptions);

// In the fallback you can put some logic to be executed if one system is not available.
breaker.fallback(()=>logger.warn('Request failed to many times. Circuit breaker is open.'));

// Execute the asyn method passing arguments if needed
export function getAllBusinessPartnerWithCircuitBreaker(top: number): Promise<BusinessPartner[]>{
    return breaker.fire(top);
}
