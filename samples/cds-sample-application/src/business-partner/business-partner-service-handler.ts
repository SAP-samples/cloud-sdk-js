import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';

const destinationName: string = process.env.CLOUD_DESTINATION;
export const BupaService = srv => {
  srv.on('getByKey', async oRequest => {
    const param = oRequest.data.param;
    const partner = await BusinessPartner
    .requestBuilder()
    .getByKey(param)
    .execute({ destinationName: destinationName });
    oRequest.reply(partner); 
  });

  srv.on('getAll', async oRequest => {
    const partners = await BusinessPartner
    .requestBuilder()
    .getAll()
    .top(5)
    .execute({ destinationName: destinationName });
    oRequest.reply(partners);
  });
}