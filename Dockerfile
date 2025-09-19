# Multi-stage build for React application with Git and npm
# Stage 1: Build the React app
FROM node:18-alpine as build

# Install git
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production with nginx, git, and npm
FROM node:18-alpine

# Install nginx and git
RUN apk add --no-cache nginx git

# Create nginx user and directories
RUN adduser -D -s /bin/sh nginx || true
RUN mkdir -p /var/log/nginx /var/lib/nginx/tmp /etc/nginx/conf.d
RUN chown -R nginx:nginx /var/log/nginx /var/lib/nginx

# Copy the build output to nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Create a basic nginx configuration
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Copy main nginx config
RUN echo 'user nginx; \
worker_processes auto; \
error_log /var/log/nginx/error.log warn; \
pid /var/run/nginx.pid; \
events { worker_connections 1024; } \
http { \
    include /etc/nginx/mime.types; \
    default_type application/octet-stream; \
    sendfile on; \
    keepalive_timeout 65; \
    include /etc/nginx/conf.d/*.conf; \
}' > /etc/nginx/nginx.conf

# Set working directory
WORKDIR /app

# Copy package.json for runtime npm operations (optional)
COPY package*.json ./

# Expose port 80
EXPOSE 80

# Create startup script
RUN echo '#!/bin/sh \
nginx -g "daemon off;" &' > /start.sh && chmod +x /start.sh

# Start nginx
CMD ["sh", "/start.sh"]