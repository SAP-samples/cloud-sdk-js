import { Request, Response } from 'express';
import {
  decodeJwt,
  getDestination,
  retrieveJwt,
  subscriberFirst
} from '@sap-cloud-sdk/connectivity';
import { createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger('destination');

export async function serviceRoute(req: Request, res: Response): Promise<void> {
  try {
    const jwt = retrieveJwt(req);
    const tenantText = jwt
      ? `You are on tenant: ${decodeJwt(jwt).zid}.`
      : `No jwt given in request. Provider tenant used.`;
    const destination = await getDestination({
      destinationName: 'destination',
      selectionStrategy: subscriberFirst,
      jwt
    });
    if (destination) {
      res.status(200).send(
        `${tenantText}. 
         The destination description is: Provider Destination Description.`
      );
    } else {
      res.status(404).send(`Destination with name 'destination' not found.`);
    }
  } catch (e) {
    logger.error(e);
    res.status(500).send('Error in retrieving destination - look at the logs.');
  }
}
