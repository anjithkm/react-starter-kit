# Use the official Node.js image as the base image
FROM node:22.13.0-alpine

# Set the working directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY package*.json ./


# Install dependencies
RUN npm install -g nodemon
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
# RUN npm run build

# Expose the port the app runs on
EXPOSE 5000
