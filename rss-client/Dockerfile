### Employ the builder pattern
FROM node:alpine as angular

## Install Angular CLI once, use cached layer for future builds
RUN npm install -g @angular/cli@9.1.7

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm ci && mkdir /app && mv ./node_modules /app
WORKDIR /app
COPY . .
RUN ng build --prod --aot

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=angular /app/dist/rss-client .