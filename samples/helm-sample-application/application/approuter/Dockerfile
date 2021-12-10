FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm config set @sap:registry https://registry.npmjs.org
RUN npm install 

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "npm", "start" ]