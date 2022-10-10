FROM node:18

ENV PORT 3000

RUN mkdir -p /usr/src/server/app
WORKDIR /usr/src/server/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD "npm" "run" "start"