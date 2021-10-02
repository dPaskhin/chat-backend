FROM node:latest

WORKDIR /app

RUN cd /app

COPY ../../app .

RUN npm ci

CMD ["npm", "run", "dev"]
