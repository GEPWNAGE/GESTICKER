# Set up frontend using yarn
FROM node:14 AS node-build

RUN yarn global add webpack-cli@3
RUN yarn global add node-sass@4.12.0

WORKDIR /app
COPY server /app/server
COPY client /app/client

RUN cd /app/client && yarn
RUN cd /app/client && yarn run build:production

# Set up nginx
FROM nginx:1.21

COPY server /app/server
COPY --from=node-build /app/server/public/build /app/server/public/build
COPY ./web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
