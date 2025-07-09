# Use a Node.js image
FROM node:22.11.0-alpine

# Install required packages
RUN apk --update --no-cache add curl
RUN apk add --no-cache wget

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies (production)
RUN npm install --only=production

# Install PM2 globally to run the app in production mode
RUN npm install -g pm2

# Copy the rest of the application code
COPY . .

# Copy prisma schema to container (if you have prisma)
COPY prisma ./prisma

# Expose port 5000 for the backend
EXPOSE 5000

# Start the app using PM2 (with clustering and no daemon)
CMD ["pm2", "start", "app.js", "-i", "max", "--no-daemon"]
