FROM node:18 AS builder

WORKDIR /frontend

COPY package.json package.json ./

COPY vite.config.ts vite.config.ts ./

COPY yarn.lock yarn.lock ./

RUN yarn
COPY . .
RUN yarn build

RUN yarn global add serve

EXPOSE 3000
CMD ["npx", "serve", "./dist", "-n"]
