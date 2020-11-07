# stage 1

FROM node:alpine AS rss-frontend-test-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# stage 2

FROM nginx:alpine
COPY --from=rss-frontend-test-build /app/dist/rss-frontend-test /usr/share/nginx/html
EXPOSE 80
