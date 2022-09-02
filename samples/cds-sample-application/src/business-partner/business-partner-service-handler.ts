import { cloudBusinessPartnerService as businessPartnerService } from '../generated/cloud-business-partner-service';
const { businessPartnerApi } = businessPartnerService();

/**
 * Service implementation for the cds service defined in /srv/business-partner-service.cds
 * Annotation @impl is used in service definition file (.cds) to specify alternative paths (relative to dist/) to load implementations from
 * Note: The name of service handler should match the cds service name
 */
export const BupaService = (srv) => {
  srv.on('getByKey', async (oRequest) => {
    const param = oRequest.data.param;
    const partner = await businessPartnerApi
      .requestBuilder()
      .getByKey(param)
      .execute({ destinationName: 'myDestinationName' });
    oRequest.reply(partner);
  });

  srv.on('getAll', async (oRequest) => {
    const partners = await businessPartnerApi
      .requestBuilder()
      .getAll()
      .top(5)
      .execute({ destinationName: 'myDestinationName' });
    oRequest.reply(partners);
  });
};
