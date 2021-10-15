FROM node:latest

WORKDIR /app

RUN cd /app

COPY ../../app .
COPY ../../.env ../

RUN npm ci

CMD ["npm", "run", "dev"]
