FROM node:14.4-buster

RUN mkdir /usr/app
WORKDIR /usr/app

RUN apt update && apt install -y python3 python3-pip 
RUN pip3 install pandas seaborn

COPY package.json package-lock.json ./
RUN npm install

EXPOSE 5000

CMD npm start
