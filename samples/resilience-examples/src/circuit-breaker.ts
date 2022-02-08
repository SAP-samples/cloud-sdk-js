import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';
import CircuitBreaker from 'opossum';
import { createLogger } from '@sap-cloud-sdk/util';
import { getAllBusinessPartner } from './test-util';

const logger = createLogger('circuit-breaker');

const breakerOptions = {
  timeout: 3000,
  errorThresholdPercentage: 80,
  resetTimeout: 30000
};

// Create a new circuit breaker around the async method
const breaker = new CircuitBreaker(getAllBusinessPartner, breakerOptions);

// In the fallback you can put some logic to be executed if the breaker is open.
breaker.fallback(() =>
  logger.warn('Request failed to many times. Circuit breaker is open.')
);

// Execute the async method passing arguments if needed
export async function getAllBusinessPartnerWithCircuitBreaker(
  top: number
): Promise<BusinessPartner[]> {
  return breaker.fire(top);
}
