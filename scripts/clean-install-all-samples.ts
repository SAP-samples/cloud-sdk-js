import execa from 'execa';
import { resolve } from 'path';
import { samples } from './samples-folders';

/**
 * We can not use workspaces because we want single package-lock.json files in each samples.
 * Also the e2e test and update repo https://github.tools.sap/cloudsdk/k8s-e2e-app replaces the local pacakge.json files with one with the same name.
 */
async function forAll() {
  for (let i = 0; i < samples.length; i++) {
    const folder = samples[i];
    const cwd = resolve(__dirname, '../', folder);
    let process = execa('rm', ['-rf', 'node_modules', 'package-lock.json'], {
      cwd
    });
    process.stdout?.on('data', (data: any) => console.log(data.toString()));
    await process;
    console.log(`Sample ${folder} cleaned`);
    process = execa('npm', ['install'], { cwd });
    process.stdout?.on('data', (data: any) => console.log(data.toString()));
    await process;
    console.log(`Sample ${folder} installed`);
  }
}

forAll();
