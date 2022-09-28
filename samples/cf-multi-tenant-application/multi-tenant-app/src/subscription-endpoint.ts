import { Request, Response } from 'express';
import { createLogger } from '@sap-cloud-sdk/util';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';
import {
  bindRoute,
  createRoute,
  deleteRoute,
  getCfGuids,
  getLandscape
} from './subscription-util';

const logger = createLogger('subscription');
const appRouterName = 'approuter';

export async function subscribeRoute(req: Request, res: Response) {
  try {
    const subscribedSubdomain = req.body.subscribedSubdomain;
    const subscriberRoute = `https://route-prefix-${subscribedSubdomain}.${getLandscape()}`;
    logger.info(`subscribe: ${subscriberRoute}`);

    const guids = await getCfGuids(appRouterName);
    const routeGuid = await createRoute(subscribedSubdomain, guids);
    await bindRoute(routeGuid, guids);

    res.status(200).send(subscriberRoute);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

export async function unsubscribeRoute(req: Request, res: Response) {
  const subscribedSubdomain = req.body.subscribedSubdomain;
  logger.info(`un-subscribe: ${subscribedSubdomain}`);
  await deleteRoute(subscribedSubdomain);
  res.status(200).send('Unsubscribed.');
}
