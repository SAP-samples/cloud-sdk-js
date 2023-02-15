import {resolve} from "path";
import execa from "execa";
import {samples} from "./clean-install-all-samples";
import {readFileSync} from "fs";
import {promises} from "fs";

const sdkVersionToSet = 'next'
const {writeFile} = promises


async function forAll(){
    for(let i = 0 ; i < samples.length ; i++) {
      const packageJsonPath = resolve(__dirname,'../',samples[i],'package.json')
        const jsonContent = JSON.parse(readFileSync(packageJsonPath,{encoding:'utf-8'}))
        setSdkVersion(jsonContent.dependencies)
        setSdkVersion(jsonContent.devDependencies)
       await writeFile(packageJsonPath,JSON.stringify(jsonContent,null,2),{encoding:'utf-8'})
        console.log(`Package.json updated in ${samples[i]}`)
    }
}

function setSdkVersion(dependencies:Record<string, string>){
    Object.keys(dependencies).forEach(key=>{
        if(key.startsWith('@sap-cloud-sdk')){
            dependencies[key] = 'next'
        }
    })
}

forAll()