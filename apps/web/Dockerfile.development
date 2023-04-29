FROM node:14-alpine

WORKDIR /web

COPY . .

RUN yarn install

RUN yarn add typescript

RUN yarn build

CMD ["yarn", "start"]
