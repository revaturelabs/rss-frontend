### Employ the builder pattern
FROM node:alpine as angular

## Install Angular CLI once, use cached layer for future builds
COPY package.json package-lock.json ./
RUN npm install -g npm@7.0.12
RUN npm install -g @angular/cli

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm ci && mkdir /app && mv ./node_modules /app
WORKDIR /app
COPY . .
RUN ng build --prod --aot


FROM nginx:alpine as node
WORKDIR /app

COPY . .
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=angular /app/dist/rss-client .
EXPOSE 80
