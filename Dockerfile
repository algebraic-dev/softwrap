FROM node:12-alpine

WORKDIR /app
COPY . /app
ENV NODE_ENV=production

RUN yarn install
RUN yarn --cwd client build 
RUN cp client/build -r server/src 

CMD ["yarn", "start"]