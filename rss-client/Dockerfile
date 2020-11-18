### Employ the builder pattern
FROM node:alpine as angular

## Install Angular CLI once, use cached layer for future builds
RUN ls
COPY package.json package-lock.json ./
RUN npm install -g npm@7.0.12
RUN npm install -g @angular/cli

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm ci && mkdir /app && mv ./node_modules /app
WORKDIR /app
COPY . .
RUN ng build --prod --aot --deployUrl=""/a05ca03ed94f848dfa2d6ef975d395ff-284278107.us-east-1.elb.amazonaws.com/rss/""


FROM nginx:alpine as node
WORKDIR /app

COPY . .
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=angular /app/dist/rss-client .
EXPOSE 80
