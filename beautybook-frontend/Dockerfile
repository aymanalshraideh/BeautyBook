# Use Node.js image for building the React app
FROM node:22.11.0-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependencies installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx to serve the build
FROM nginx:alpine

# Copy the built React app to Nginx's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Run Nginx server
CMD ["nginx", "-g", "daemon off;"]
