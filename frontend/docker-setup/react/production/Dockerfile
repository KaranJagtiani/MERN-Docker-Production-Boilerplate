#
# Stage 1: React production build
#
FROM node:16-slim as frontend

# Create app directory
WORKDIR /frontend

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV=production

RUN yarn build

EXPOSE 3000

#
# Stage 2: Nginx as a proxy & static file server
#
FROM nginx:1.23.0

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

RUN apt-get update && apt-get install -y certbot python3-certbot-nginx vim

# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/*

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets from builder stage
COPY --from=frontend /frontend/build .

# Update the nginx config with our own config file
COPY --from=frontend /frontend/docker-setup/nginx/mern-template.conf /etc/nginx/conf.d/

EXPOSE 80

RUN useradd -ms /bin/bash nonroot

RUN chown -R nonroot:nonroot /etc/nginx/conf.d/ /var/cache/nginx/ /var/run/

USER nonroot

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
