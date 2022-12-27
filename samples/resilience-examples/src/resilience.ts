import { HttpMiddlewareContext, Middleware } from '@sap-cloud-sdk/resilience';
import { HttpResponse, executeHttpRequest } from '@sap-cloud-sdk/http-client';
import { Destination } from '@sap-cloud-sdk/connectivity';
import { createLogger } from '@sap-cloud-sdk/util';

/**
 * Middleware calling a fallback system if the initial request fails.
 * This is just a sample and in a real implementation you should consider what part of the request config should be forwarded to the new system.
 * @param fallbackSystem - System which is called if the initial request fails.
 * @returns The middleware adding a fallback.
 */
export function fallbackMiddleware(
  fallbackSystem: Destination
): Middleware<HttpResponse, HttpMiddlewareContext> {
  return options => async () => {
    try {
      return await options.fn();
    } catch (e) {
      return executeHttpRequest(fallbackSystem);
    }
  };
}

const logger = createLogger('http-logs');

/**
 * Middleware logging the username if the request fails with 403.
 * For this example basic authentication is assumed, but you could also decode a JWT and take the userId from there.
 * @returns The logging middleware.
 */
export function loggingMiddleware(): Middleware<
  HttpResponse,
  HttpMiddlewareContext
> {
  return options => async () => {
    try {
      return await options.fn();
    } catch (err) {
      const [authType, authorizationHeader] =
        options.context.requestConfig.headers['authorization']
          .toString()
          .split(' ');
      if (authType.toLowerCase() === 'basic' && err.response.status === 403) {
        const decoded = Buffer.from(authorizationHeader, 'base64').toString(
          'utf8'
        );
        logger.error(
          `The user ${
            decoded.split(':')[0]
          } is not authorized to do the request.`
        );
        options.skipNext();
      }
      throw err;
    }
  };
}
