FROM node:14-alpine

WORKDIR /workdir

COPY /deployment /workdir

RUN npm install -g npm@latest

RUN ["npm", "install", "--unsafe-perm", "--production"]

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
