import { resolve } from 'path';
import { writeFilesToServiceSpecFolder } from './fetch-service-spec';

/**
 * Helper script to fetch the service specs to all samples which need it.
 */
const cfSampleApplication = resolve(
  __dirname,
  '../samples/cf-sample-application/resources/service-specs'
);
writeFilesToServiceSpecFolder(cfSampleApplication);
