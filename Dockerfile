FROM node:7-alpine

RUN mkdir -p /opt/micro

COPY ./package.json /opt/micro
COPY ./container /opt/micro/container

RUN cd /opt/micro && npm install --production

WORKDIR /opt/micro

EXPOSE 3000
CMD [ "npm", "run", "prod" ]
