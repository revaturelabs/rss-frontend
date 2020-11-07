# FROM nginx:alpine as node
# WORKDIR /app

# COPY . .
# RUN npm i yarn
# RUN yarn global add @angular/cli@latest
# RUN npm install # install dependencies
# RUN ng build --configuration=staging # build application 
# CD /app/dist/rss-client
# RUN ng build #--prod

# STAGE 2
# Deploy APP

# In this stage, we are going to take the build artefacts from stage one and build a deployment docker image
# We are using nginx:alpine as the base image of our deployment image

FROM nginx:alpine as node
WORKDIR /app

COPY . .
RUN echo "YOU ARE HERE:"
RUN pwd
RUN echo "With folder contents thus:"
RUN ls
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
# COPY --from=node /app/dist/rss-client/nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=node /app/.docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
