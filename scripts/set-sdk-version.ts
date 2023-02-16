import { resolve } from 'path';
import execa from 'execa';
import { readFileSync } from 'fs';
import { promises } from 'fs';
import { samples } from './samples-folders';

const sdkVersionToSet = 'next';
const { writeFile } = promises;

/**
 * We can not use workspaces because we want single package-lock.json files in each samples.
 * Also the e2e test and update repo https://github.tools.sap/cloudsdk/k8s-e2e-app replaces the local pacakge.json files with one with the same name.
 */
async function forAll() {
  for (let i = 0; i < samples.length; i++) {
    const packageJsonPath = resolve(
      __dirname,
      '../',
      samples[i],
      'package.json'
    );
    const jsonContent = JSON.parse(
      readFileSync(packageJsonPath, { encoding: 'utf-8' })
    );
    setSdkVersion(jsonContent.dependencies);
    setSdkVersion(jsonContent.devDependencies);
    await writeFile(packageJsonPath, JSON.stringify(jsonContent, null, 2), {
      encoding: 'utf-8'
    });
    console.log(`Package.json updated in ${samples[i]}`);
  }
}

function setSdkVersion(dependencies: Record<string, string>) {
  Object.keys(dependencies).forEach(key => {
    if (key.startsWith('@sap-cloud-sdk')) {
      dependencies[key] = 'next';
    }
  });
}

forAll();
