FROM nginx:alpine as node
WORKDIR /app

COPY . .
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 80
