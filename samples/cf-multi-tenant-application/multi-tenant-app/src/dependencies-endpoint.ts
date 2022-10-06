import { Request, Response } from 'express';
import * as xsenv from '@sap/xsenv';

const relevantServices = ['destination'];

export function dependencyRoute(req: Request, res: Response): void {
  res.status(200).send(
    relevantServices
      .map(s => {
        const services = xsenv.filterCFServices({ label: s });

        return services && services.length
          ? {
              appId:
                services[0].credentials.xsappname ||
                services[0].credentials.uaa.xsappname,
              appName: s
            }
          : null;
      })
      .filter(elem => elem)
  );
}
