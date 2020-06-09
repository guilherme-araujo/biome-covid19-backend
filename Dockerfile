FROM node:14.4-buster

RUN mkdir /usr/app
WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm install

RUN apt update && apt install -y python3 python3-pip 

RUN pip3 install pandas

EXPOSE 5000

CMD npm ${COMMAND}
