FROM node:latest

RUN apt update

RUN apt -y install nano

WORKDIR /app

RUN cd /app

COPY ../../app .
COPY ../../.env ../

RUN npm ci

CMD ["npm", "run", "dev"]
