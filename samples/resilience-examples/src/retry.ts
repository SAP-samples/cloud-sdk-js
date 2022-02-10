import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';
import retry from 'async-retry';
import { createLogger } from '@sap-cloud-sdk/util';
import { getAllBusinessPartner } from './business-partner-request';

const logger = createLogger('retry');

const options = {
  retries: 2,
  minTimeout: 500
};

// Create a wrapper passing arguments
export async function getAllBusinessPartnerWithRetry(
  top: number
): Promise<BusinessPartner[]> {
  // Wrap the retry block around the async function.
  return retry(async bail => {
    try {
      const bps = await getAllBusinessPartner(top);
      return bps;
    } catch (error) {
      // Use the bail() method to stop the retries for some cases
      if (error.cause.response.status === 401) {
        logger.warn('Request failed with status 401 - no retry necessary.');
        bail(error);
      }
      throw error;
    }
  }, options);
}
