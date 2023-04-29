FROM node:14-alpine

WORKDIR /server

COPY package.json ./
COPY tsconfig.json ./
COPY src ./src

RUN apk update && \
    apk upgrade && \
    apk add --no-cache git

RUN git clone https://github.com/vishnubob/wait-for-it.git

RUN apk add --no-cache bash

RUN yarn install

RUN yarn add typescript

RUN yarn build

COPY start.sh .
RUN chmod +x start.sh

CMD ["./start.sh"]
