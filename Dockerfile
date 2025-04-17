# ----------- Stage 1: Build Angular App ------------
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Upgrade npm to latest
RUN npm install -g npm@latest

# Optional: install Angular CLI globally (make sure it matches project version if needed)
#RUN npm install -g @angular/cli

# Copy package files first (to leverage Docker cache)
COPY package*.json ./

# Use npm install instead of npm ci for flexibility (due to lockfile issues)
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Angular app in production mode
RUN npm run build -- --configuration production

# ----------- Stage 2: Serve with Nginx -------------
FROM nginx:1.25-alpine

# Copy the build output from the previous stage
COPY --from=builder /app/dist/angular-from-scratch/browser /usr/share/nginx/html

# Optional: custom nginx config (uncomment if you have it)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
