FROM node:12-alpine

WORKDIR /app
COPY . /app
ENV NODE_ENV=production

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]