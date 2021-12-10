{
  for file in xs-app.json .npmrc package.json ; do
if [[ ! -e $file ]] ; then echo -e "\e[33m[WARNING] $file does not exist\e[0m"; fi ;
  done
  zip -r approuter.zip .
}