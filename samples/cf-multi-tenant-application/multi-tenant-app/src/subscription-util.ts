import { executeHttpRequest } from '@sap-cloud-sdk/http-client';
import * as cfEnv from 'cfenv';
const appRouterName = 'approuter';
const routePrefix = 'route-prefix';
const cfApiDestination = { destinationName: 'cf-api', useCache: true };

type Guids = {
  appGuid: string;
  domainGuid: string;
  spaceGuid: string;
};

export async function getCfGuids(appName: string): Promise<Guids> {
  const spaceGuid = cfEnv.getAppEnv().app.space_id;
  const orgGuid = cfEnv.getAppEnv().app.organization_id;

  const {
    data: {
      resources: [{ guid: appGuid }]
    }
  } = await executeHttpRequest(cfApiDestination, {
    method: 'get',
    url: `/v3/apps?organization_guids=${orgGuid}&space_guids=${spaceGuid}&names=${appName}`
  });

  try {
    const {
      data: {
        resources: [{ guid: domainGuid }]
      }
    } = await executeHttpRequest(cfApiDestination, {
      method: 'get',
      url: `/v3/domains?names=${encodeURI(getLandscape())}`
    });
    return { appGuid, domainGuid, spaceGuid };
  } catch (e) {
    console.log(e);
  }
}

export function getLandscape(): string {
  const result = cfEnv
    .getAppEnv()
    .app.application_uris[0].split('.')
    .slice(1)
    .join('.');
  return result;
}

function getRoutePath(subscribedSubdomain: string): string {
  return `${routePrefix}-${subscribedSubdomain}`;
}

export async function bindRoute(routeGuid: string, guids: Guids) {
  const bindRouteBody = {
    destinations: [
      {
        app: {
          guid: guids.appGuid
        }
      }
    ]
  };
  return executeHttpRequest(cfApiDestination, {
    url: `/v3/routes/${routeGuid}/destinations`,
    method: 'post',
    data: bindRouteBody
  });
}

export async function createRoute(
  subscribedSubdomain: string,
  guids: Guids
): Promise<string> {
  const createRouteBody = {
    host: getRoutePath(subscribedSubdomain),
    relationships: {
      space: {
        data: {
          guid: guids.spaceGuid
        }
      },
      domain: {
        data: {
          guid: guids.domainGuid
        }
      }
    }
  };
  const createdRoute = (
    await executeHttpRequest(cfApiDestination, {
      url: '/v3/routes',
      method: 'post',
      data: createRouteBody
    })
  ).data;
  return createdRoute.guid;
}

export async function deleteRoute(subscribedSubdomain: string) {
  try {
    const { appGuid } = await getCfGuids(appRouterName);
    const routes = (
      await executeHttpRequest(cfApiDestination, {
        method: 'get',
        url: `/v3/apps/${appGuid}/routes?hosts=${getRoutePath(
          subscribedSubdomain
        )}`
      })
    ).data;
    await Promise.all(
      routes.resources.map(ele =>
        executeHttpRequest(cfApiDestination, {
          method: 'delete',
          url: `/v3/routes/${ele.guid}`
        })
      )
    );
  } catch (e) {
    console.log(e.msg);
  }
}
