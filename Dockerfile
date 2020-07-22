FROM node:12.18-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8000/tcp

CMD ["yarn", "start"]