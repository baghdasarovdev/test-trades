FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++ bash

COPY . .

RUN npm install

ENV NODE_ENV production
RUN npm run build
RUN npm prune --production
CMD ["npm", "start"]
EXPOSE 3000
