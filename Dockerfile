FROM node:alpine

RUN mkdir /usr/app
WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm install

#COPY . ./

EXPOSE 5000


CMD npm ${COMMAND}
