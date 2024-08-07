FROM node:22-alpine3.19 AS base
WORKDIR /app
EXPOSE 5000
COPY ./package.json .
RUN npm install
COPY . .

FROM base as dev
CMD ["npm", "run", "dev"]

FROM base as prod
RUN npm run build