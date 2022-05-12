FROM node:14-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install -g npm@latest

RUN npm install --unsafe-perm --production

COPY . ./

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
