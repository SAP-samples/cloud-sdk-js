import Axios, { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';
import { promises } from 'fs';
import { resolve, join } from 'path';

dotenv.config();
const { writeFile, rm, mkdir } = promises;

export const productiveApiHubUrl =
  'https://cloudintegration.hana.ondemand.com/';

async function fetchApiContent(artifactName: string): Promise<string> {
  const requestURL = `odata/1.0/catalog.svc/APIContent.APIs(Name='${artifactName}')/$value?type=EDMX`;
  const response = await Axios.request({
    method: 'GET',
    url: `${productiveApiHubUrl}${requestURL}`,
    headers: { authorization: getBasicHeaderFromEnv() }
  });
  console.info(`Service definition fetched: ${artifactName}.`);
  return response.data;
}

function getBasicHeaderFromEnv(): string {
  if (!process.env.apiHubUser) {
    console.error('User not given in process.env.apiHubUser');
    throw new Error('User not given in process.env.apiHubUser');
  }
  if (!process.env.apiHubUserPassword) {
    console.error('Password not given in process.env.apiHubUserPassword');
    throw new Error('Password not given in process.env.apiHubUserPassword');
  }
  return basicHeader(process.env.apiHubUser, process.env.apiHubUserPassword);
}

function basicHeader(username: string, password: string): string {
  const encoded = Buffer.from(`${username}:${password}`).toString('base64');
  return 'Basic ' + encoded;
}
async function writeServiceDefintion(
  specRoot: string,
  content: string,
  fileName: string
): Promise<void> {
  const path = join(specRoot, fileName);
  await writeFile(path, content, { encoding: 'utf-8' });
  console.info(`Service definition written: ${path}.`);
}

export async function writeFilesToServiceSpecFolder(specRoot: string) {
  await cleanUp(specRoot);
  const contentCloud = await fetchApiContent('API_BUSINESS_PARTNER');
  await writeServiceDefintion(
    specRoot,
    contentCloud,
    'API_BUSINESS_PARTNER.edmx'
  );
  const contentOp = await fetchApiContent('OP_API_BUSINESS_PARTNER_SRV');
  await writeServiceDefintion(
    specRoot,
    contentOp,
    'OP_API_BUSINESS_PARTNER_SRV.edmx'
  );
  await createServiceMapping(specRoot);
}

async function cleanUp(specRoot: string) {
  await rm(specRoot, { recursive: true });
  await mkdir(specRoot);
}

async function createServiceMapping(specRoot: string) {
  const content = {
    'resources/service-specs/API_BUSINESS_PARTNER.edmx': {
      directoryName: 'cloud-business-partner-service',
      basePath: '/sap/opu/odata/sap/API_BUSINESS_PARTNER',
      packageName: 'cloud-business-partner-service'
    },
    'resources/service-specs/OP_API_BUSINESS_PARTNER_SRV.edmx': {
      directoryName: 'op-business-partner-service',
      basePath: '/sap/opu/odata/sap/API_BUSINESS_PARTNER',
      packageName: 'op-business-partner-service'
    }
  };
  await writeFile(
    join(specRoot, 'options-per-service.json'),
    JSON.stringify(content, null, 2),
    { encoding: 'utf-8' }
  );
}
